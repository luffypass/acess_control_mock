'use strict';

const axios = require("axios");
const fs = require("fs");
const request = require("request")
const util = require("util");
const apiKey = process.env.BOT_API_KEY;
const stage = process.env.STAGE;
const channel = stage === "dev" ? process.env.TEST_CHANNEL : process.env.CHANNEL_ID;

const sendMessageUrl = `https://api.telegram.org/bot${apiKey}/sendMessage`
const sendPhotoUrl = `https://api.telegram.org/bot${apiKey}/sendPhoto`

module.exports.sendMessage = async message => {
  const result = await axios(
    {
      method: "post",
      url: sendMessageUrl,
      responseType: "json",
      data: {
        chat_id: channel,
        text: message
      }
    }
  );

  return result.data;
}

module.exports.sendDetails = async data => {

  const message = `Name:\t${data.recipient.name}\
  \nDate of birth:\t${data.recipient.dob}\
  \nPhoto:\t sample\
  \nExpiry:\t${data.pass.expiryDate}`

  const result = await this.sendMessage(message);
  return result;
}

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

module.exports.sendPushNotif = async ({recipient, pass}) => {
  const buffer = Buffer.from(recipient.photo, "base64");
  fs.writeFileSync("/tmp/2.jpeg", buffer)
  const stream =  fs.createReadStream("/tmp/2.jpeg")


  const caption = `Name:\t${recipient.name}\
  \nDate of birth:\t${recipient.dob}\
  \nPhoto:\t sample\
  \nExpiry:\t${pass.expiryDate}`

  const formData ={
    "chat_id": "@samuellye98",
    "photo": stream,
    caption
  }

  const post = util.promisify(request.post);
  const {err, res, body} = await post(sendPhotoUrl,{
    headers:{
      "Content-Type": "multipart/form-data"
    },
    formData
  });

  return {err, res, body}

}

