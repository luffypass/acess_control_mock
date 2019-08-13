"use strict";
const { sendMessage, sendPushNotif } = require("./services");

module.exports.sendTestMessage = async (event, context, callback) => {
  const result = await sendMessage("HI");
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "message sent"
      },
      null,
      2
    )
  };
};

module.exports.getRequirement = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        endpoint: "https://workpass.brightsteel.dev/post/requirements",
        details: [
          "recipient.name",
          "recipient.dob",
          "recipient.photo",
          "pass.expiryDate"
        ]
      },
      null,
      2
    )
  };
};

module.exports.postRequirement = async (event, context, callback) => {
  // console.log(context)
  // console.log(callback)
  const doc = JSON.parse(event.body);
  // const workpass = doc.document;
  const workpass = doc.data;
  const { recipient, pass } = workpass;
  if (!recipient.name) {
    return {
      message: "missing name"
    };
  }

  if (!recipient.dob) {
    return {
      message: "missing date of birth"
    };
  }

  if (!recipient.photo) {
    return {
      message: "missing photio"
    };
  }

  if (!pass.expiryDate) {
    return {
      message: "missing expiry date"
    };
  }

  // const result = await sendDetails({recipient, pass});
  // await sendMessage("next");
  const response = await sendPushNotif(doc);
  console.log(response);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
