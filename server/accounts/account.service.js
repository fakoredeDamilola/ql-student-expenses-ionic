const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("_helpers/send-email");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const { CONNREFUSED } = require("dns");

module.exports = {
  authenticate,
  refreshToken,
  revokeToken,
  register,
  verifyEmail,
  forgotPassword,
  validateResetToken,
  resetPassword,
  getAll,
  getById,
  createAccount,
  update,
  delete: _delete,
  updateExpensesOnAccount,
  updateReportsOnAccount,
  getAllStudentsInReports,
  getReportsExpenses,
};

async function authenticate({ email, password, ipAddress }) {
  const account = await db.Account.findOne({ email });

  //console.log(account,"Im finding the account")

  if (
    !account ||
    !account.isVerified ||
    !bcrypt.compareSync(password, account.passwordHash)
  ) {
    //console.log("So whats wrong???")
    throw "Email or password is incorrect";
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(account);
  const refreshToken = await generateRefreshToken(account, ipAddress);

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function refreshToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  const { account } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = await generateRefreshToken(account, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = await ipAddress;
  refreshToken.replacedByToken = await newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(account);

  // return basic details and tokens
  return {
    ...basicDetails(account),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function revokeToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = await ipAddress;
  await refreshToken.save();
}

async function register(params, origin) {
  // validate
  //console.log(params,"here")
  if (await db.Account.findOne({ email: params.email })) {
    // send already registered error in email to prevent account enumeration
    return await sendAlreadyRegisteredEmail(params.email, origin);
  }
  //console.log("Getting here???")
  // createAccount account object
  const account = new db.Account(params);

  // first registered account is an admin
  const isFirstAccount = (await db.Account.countDocuments({})) === 0;
  account.role = isFirstAccount
    ? Role.Admin
    : params.role == "ReportsManager"
    ? Role.ReportsManager
    : params.role == "Admin"
    ? Role.Admin
    : Role.Student;
  account.verificationToken = randomTokenString();

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

  // send email
  await sendVerificationEmail(account, origin);
}

async function verifyEmail({ token }) {
  //console.log("getting here...tooveos",token)
  const account = await db.Account.findOne({ verificationToken: token });
  //console.log(account)
  if (!account) throw "Verification failed";

  account.verified = Date.now();
  account.verificationToken = undefined;
  await account.save();
}

async function forgotPassword({ email }, origin) {
  const account = await db.Account.findOne({ email });

  // always return ok response to prevent email enumeration
  if (!account) return;

  // createAccount reset token that expires after 24 hours
  account.resetToken = {
    token: randomTokenString(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };
  await account.save();

  // send email
  await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
  const account = await db.Account.findOne({
    "resetToken.token": token,
    "resetToken.expires": { $gt: Date.now() },
  });

  if (!account) throw "Invalid token";
}

async function resetPassword({ token, password }) {
  const account = await db.Account.findOne({
    "resetToken.token": token,
    "resetToken.expires": { $gt: Date.now() },
  });
  if (!account) throw "Invalid token";

  // update password and remove reset token
  account.passwordHash = hash(password);
  account.passwordReset = Date.now();
  account.resetToken = undefined;
  await account.save();
}

async function getAll() {
  const accounts = await db.Account.find()
    .populate("studentExpensesCount")
    .populate("reportsManagerReportsCount");
  return await accounts.map((x) => basicDetails(x));
}

async function getAllStudentsInReports(ReportsManagerId) {
  const allStudentsInReports = await db.Account.find({
    ReportsManagerId: ReportsManagerId,
  })
    .populate("studentExpenses")
    .populate("studentExpensesCount")
    .populate("studentReport");

  return await allStudentsInReports.map((x) => basicDetails(x));
}

//right here
async function getReportsExpenses(reportsManagerId) {
  const allReportsAccounts = await db.Account.find({
    reportsManagerId: reportsManagerId,
  }).populate("studentExpenses");
  const accountsLength = await allReportsAccounts.length;
  let resultsArray = [];
  for (let i = 0; i < accountsLength; i++) {
    if (allReportsAccounts[i].studentExpenses.length != 0) {
      let expensesCountOfAccount = await allReportsAccounts[i].studentExpenses
        .length;
      for (let y = 0; y < expensesCountOfAccount; y++) {
        resultsArray.push(allReportsAccounts[i].studentExpenses[y]);
      }
    }
  }
  return resultsArray;
}

async function getById(id) {
  const account = await db.Account.findById(id)
    .populate("studentExpenses")
    .populate("studentExpensesCount")
    .populate("studentReport")
    .populate("reportsManagerReports")
    .populate("reportsManagerExpenses")
    .populate("reportsManagerStudents")
    .populate("reportsManagerExpensesCount")
    .populate("reportsManagerStudentsCount");

  return basicDetails(account);
}

async function createAccount(params) {
  // validate
  if (await db.Account.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const account = new db.Account(params);
  account.verified = Date.now();

  // hash password
  account.passwordHash = hash(params.password);

  // save account
  await account.save();

  return basicDetails(account);
}

async function update(id, params) {
  const account = await getAccount(id);
  // console.log(account)
  // Later
  /*const doc = await db.Account.findOne({ email: params.email }).populate('ExpensesArray');
      console.log(doc,"HUGE TEST");
      console.log("REALLY???",doc.ExpensesArray,"HUGE TEST222");*/
  //console.log(params)
  if (
    params.email &&
    account.email !== params.email &&
    (await db.Account.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }
  // hash password if it was entered
  if (params.password) {
    params.passwordHash = hash(params.password);
  }

  // copy params to account and save

  await Object.assign(account, params);
  account.updated = Date.now();
  await account.save();
  return basicDetails(account);
}

// This Works!!! fuck yea
async function updateExpensesOnAccount(accountId, params) {
  const Expense = await new db.Expense(params);
  expense.updated = Date.now();
  await expense.save();
  const account = await getAccount(accountId);

  await account.expenses.push(expense);
  account.updated = Date.now();
  await account.save();
  return basicDetails(account);
}

async function _delete(id) {
  const account = await getAccount(id);
  await account.remove();
}

// This Works!!! fuck yea
async function updateReportsOnAccount(accountId, params) {
  const report = await new db.Report(params);
  report.updated = Date.now();
  await report.save();
  const account = await getAccount(accountId);

  await account.reports.push(Report);
  account.updated = Date.now();
  await account.save();
  return basicDetails(account);
}

async function _delete(id) {
  const account = await getAccount(id);
  await account.remove();
}

// helper functions

async function getAccount(id) {
  if (!db.isValidId(id)) throw "Account not found";
  const account = await db.Account.findById(id)
    .populate("studentExpenses")
    .populate("studentExpensesCount")
    .populate("reportsManagerReports")
    .populate("reportsManagerExpenses")
    .populate("reportsManagerStudents")
    .populate("reportsManagerExpensesCount")
    .populate("reportsManagerStudentsCount");
  if (!account) throw "Account not found";
  return await account;
}

async function getRefreshToken(token) {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate(
    "account"
  );
  if (!refreshToken || !refreshToken.isActive) throw "Invalid token";
  return refreshToken;
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
  // createAccount a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(account, ipAddress) {
  // createAccount a refresh token that expires in 7 days
  return new db.RefreshToken({
    account: account.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

function basicDetails(account) {
  const {
    id,
    title,
    ReportsManagerId,
    ReportId,
    firstName,
    lastName,
    email,
    role,
    created,
    updated,
    isVerified,
    studentExpenses,
    studentExpensesCount,
    test,
    studentReport,
    reportsManagerReports,
    reportsManagerReportsCount,
    reportsManagerExpenses,
    reportsManagerStudents,
    reportsManagerExpensesCount,
    reportsManagerStudentsCount,
  } = account;
  return {
    id,
    title,
    ReportsManagerId,
    ReportId,
    firstName,
    lastName,
    email,
    role,
    created,
    updated,
    isVerified,
    studentExpenses,
    studentExpensesCount,
    test,
    studentReport,
    reportsManagerReports,
    reportsManagerReportsCount,
    reportsManagerExpenses,
    reportsManagerStudents,
    reportsManagerExpensesCount,
    reportsManagerStudentsCount,
  };
}

async function sendVerificationEmail(account, origin) {
  let message;
  if (origin) {
    const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
    message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: "Expense Check Invite- Verify Email",
    html: `<h4>Verify Email</h4>
               <p>You have been invited to join Expense Check!</p>
               <p>Please Note, the Default password is <b>ExpenseCheck123</b><p>
               <p>It is important that you change it after you log in!<p>
               ${message}`,
  });
}

async function sendAlreadyRegisteredEmail(email, origin) {
  let message;
  if (origin) {
    message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
  } else {
    message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
  }

  await sendEmail({
    to: email,
    subject: "Expense Check - Email Already Registered",
    html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
  });
}

async function sendPasswordResetEmail(account, origin) {
  let message;
  if (origin) {
    const resetUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`;
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
  }

  await sendEmail({
    to: account.email,
    subject: "Expense Check - Reset Password",
    html: `<h4>Reset Password Email</h4>
               ${message}`,
  });
}
