const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllExpensesInProperties,
  getAllExpensesOnAccount
};

async function getAllExpensesInProperties(reportsManagerId){
  const Expenses = await db.Expense.find({reportsManagerId:reportsManagerId});
  //console.log(Expenses)
  return Expenses.map((x) => basicDetails(x));
}

async function getAllExpensesOnAccount(accountId){
  const expenses = await db.Expense.find({studentId:accountId});
  console.log(expenses)
  return expenses.map((x) => basicDetails(x));
}

async function getAll() {
  const Expense = await db.Expense.find();
  return Expense.map((x) => basicDetails(x));
}

async function getById(id) {
  const Expense = await getExpense(id);
  return basicDetails(Expense);
}

async function create(params) {
  const Expense = new db.Expense(params);
  await Expense.save();
  return basicDetails(Expense);
}

async function update(id, params) {
  const Expense = await getExpense(id);
  // copy params to account and save
  Object.assign(Expense, params);
  Expense.updated = Date.now();
  await Expense.save();
  return basicDetails(Expense);
}

async function _delete(id) {
  const Expense = await getExpense(id);
  await Expense.remove();
}

// helper functions

async function getExpense(id) {
  const Expense = await db.Expense.findById(id);
  if (!Expense) throw "Expense not found";
  return Expense;
}

function basicDetails(Expense) {
  const {
    id,
    studentId,
    reportId,
    reportsManagerId,
    expenseName,
    expenseCost,
    created
  } = Expense;
  return {
    id,
    studentId,
    reportId,
    reportsManagerId,
    expenseName,
    expenseCost,
    created
  };
}
