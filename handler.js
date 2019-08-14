const { sendPushNotif } = require("./services");

module.exports.postRequirement = async event => {
  const document = JSON.parse(event.body);
  const workpass = document.data;
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

  const response = await sendPushNotif(document);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
