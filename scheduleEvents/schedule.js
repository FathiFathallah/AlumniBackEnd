module.exports.schedule = (req, res, next) => {
  const { startDate } = req.body;
  let calculatedDate = new Date(startDate);
  calculatedDate.setDate(calculatedDate.getDate() - 1);
  calculatedDate = calculatedDate.toISOString();
  const reminderDate = new Date(calculatedDate);
  req.body.reminderDate = reminderDate;

  calculatedDate = new Date(startDate);
  calculatedDate.setHours(calculatedDate.getHours() - 3);
  calculatedDate = calculatedDate.toISOString();
  const reminderDate2 = new Date(calculatedDate);
  req.body.reminderDate2 = reminderDate2;
  next();
  // let calculatedDate = new Date(startDate);
  // calculatedDate.setDate(calculatedDate.getDate() - 1);
  // calculatedDate = calculatedDate.toISOString();
  // const reminderDate = new Date(calculatedDate);
  // schedule.scheduleJob(reminderDate, sendReminder);
  // reminderDate.setDate(reminderDate.getDate() - 2);
  // schedule.scheduleJob(reminderDate, sendReminder);
};
