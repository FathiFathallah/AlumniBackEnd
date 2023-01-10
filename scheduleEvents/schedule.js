const schedule = require("node-schedule");
module.exports.schedule = () => {
  let currentDate = new Date();
  console.log(currentDate);
  currentDate.setMinutes(currentDate.getMinutes() + 1);
  currentDate = currentDate.toISOString();
  const someDate = new Date(currentDate);
  schedule.scheduleJob(someDate, () => {
    console.log(
      "this is what i doooooooooooooooooooooooooooooo",
      new Date().toString()
    );
  });
};
