const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getAllReportsOnAccount,
};

async function getAll() {
  const report = await db.Report.find()
  .populate('reportStudentsCount')
  .populate('reportExpensesCount');
  

  return report.map((x) => basicDetails(x));
}

async function getById(id) {
  const report = await getReport(id);

  return basicDetails(report);
}

async function create(params) {
  const report = new db.Report(params);
  await report.save();
  return basicDetails(report);
}

async function update(id, params) {
  const report = await getReport(id);
  // copy params to account and save
  Object.assign(Report, params);
  report.updated = Date.now();
  await report.save();
  return basicDetails(report);
}

async function _delete(id) {
  console.log("Im deleting Report...");
  const report = await getReport(id);
  await report.remove();
}

// helper functions

async function getAllReportsOnAccount(reportsManagerId) {
  const reports = await db.Report.find({
    reportsManagerId: reportsManagerId
  })
    /*.populate("ReportPetOwner")
    .populate("ReportPetsCount")
    .populate("ReportPetOwnerCount");*/
  return await reports;
}

async function getReport(id) {

  const report = await db.Report.findById(id)
  .populate("reportStudents")
  .populate('reportExpenses')
  .populate('reportExpensesCount');

  //if (!Report) throw 'Report not found';
  return report;
}

function basicDetails(report) {
  const {
    id,
    reportsManagerId,
    reportsManager,
    reportName,
    reportStudents,
    reportStudentsCount,
    reportExpensesCount,
    reportExpenses,
    created
  } = report;
  return {
    id,
    reportsManagerId,
    reportsManager,
    reportName,
    reportStudents,
    reportStudentsCount,
    reportExpensesCount,
    reportExpenses,
    created
  };
}
