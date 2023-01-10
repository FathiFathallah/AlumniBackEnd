module.exports.sendSMS = () => {
  const accountSid = "ACaedcfa6d33831dbb67e7065dbefbeaaa";
  const authToken = "191c04f75990b6ab37841995016a04f9";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "YEEES THIS IS THE BEEEST",
      to: "+970594046462",
    })
    .then((message) => console.log(message.sid))
    .done();
};
