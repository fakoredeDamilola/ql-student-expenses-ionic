const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  reportsManagerId: { type: String, required: false },
  reportId: { type: String, required: false },
  passwordHash: { type: String, required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  acceptTerms: Boolean,
  role: { type: String, required: true },
  verificationToken: String,
  verified: Date,
  resetToken: {
    token: String,
    expires: Date,
  },
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
},
{ toJSON :{ virtuals :true},
  toObject :{ virtuals :true}
}
);


schema.virtual("isVerified").get(function () {
  return !!(this.verified || this.passwordReset);
});

// My Expenses as a Expense Owner
schema.virtual("studentExpenses", {
  ref: "Expense", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "studentId", // is equal to `foreignField`
  justOne: false,
});

schema.virtual("studentExpensesCount", {
  ref: "Expense", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "studentId", // is equal to `foreignField`
  justOne: false,
  count:true
});

schema.virtual("studentReport", {
  ref: "Report", // The model to use
  localField: "reportId", // Find people where `localField`
  foreignField: "_id", // is equal to `foreignField`
  justOne: true
});
// My Properties if I am A Report Manager
schema.virtual("reportsManagerProperties", {
  ref: "Report", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
});
schema.virtual("reportsManagerPropertiesCount", {
  ref: "Report", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
  count:true
});
// Expenses In My Properties if I am A Report Manager
schema.virtual("reportManagerExpenses", {
  ref: "Expense", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
});
// Expense Owners In My Properties if I am A Report Manager
schema.virtual("reportsManagerstudents", {
  ref: "Account", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
});

schema.virtual("reportsManagerExpensesCount", {
  ref: "Expense", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
  count: true,
});
// Expense Owners In My Properties if I am A Report Manager
schema.virtual("reportsManagerstudentsCount", {
  ref: "Account", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "reportsManagerId", // is equal to `foreignField`
  justOne: false,
  count: true,
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("Account", schema);
