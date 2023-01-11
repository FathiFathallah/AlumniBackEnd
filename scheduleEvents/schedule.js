module.exports.schedule = (req, res, next) => {
  const { startDate } = req.body;
  let calculatedDate = new Date(startDate);
  calculatedDate.setDate(calculatedDate.getDate() - 1);
  calculatedDate = calculatedDate.toISOString();
  const reminderDate = new Date(calculatedDate);
  req.body.reminderDate = reminderDate;
  next();
  // let calculatedDate = new Date(startDate);
  // calculatedDate.setDate(calculatedDate.getDate() - 1);
  // calculatedDate = calculatedDate.toISOString();
  // const reminderDate = new Date(calculatedDate);
  // schedule.scheduleJob(reminderDate, sendReminder);
  // reminderDate.setDate(reminderDate.getDate() - 2);
  // schedule.scheduleJob(reminderDate, sendReminder);
};
