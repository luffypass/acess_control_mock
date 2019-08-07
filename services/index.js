'use strict';

const axios = require("axios");
const fs = require("fs");
const request = require("request")
const util = require("util");
const {getData} = require("@govtechsg/open-attestation");
const { formatDate, getCurrentDateAndTime} = require("./date");
const { verifyWorkpassBoolean } = require("./verificationService");
const {
  chat_id,
  sendMessageUrl,
  sendPhotoUrl,
  TIMEZONE
} = require("./constants");


const sendMessage = async text => {
  const result = await axios(
    {
      method: "post",
      url: sendMessageUrl,
      responseType: "json",
      data: {
        chat_id,
        text,
      }
    }
  );

  return result.data;
}
const getCaption = async ({recipient, pass, doc}) => {
  const isValid = await verifyWorkpassBoolean(doc);
  const caption = `Timestamp: ${getCurrentDateAndTime()}\
  \nName:\t${recipient.name}\
  \nDate of birth:\t${formatDate(recipient.dob)}\
  \nExpiry:\t${formatDate(pass.expiryDate)}\
  \nStatus:\t${isValid ? "VALID" : "INVALID"}`

  return caption;
}

const sendPushNotif = async doc => {
  
  const cleanDoc = getData(doc);
  const {recipient , pass} = cleanDoc;

  // decode b64, convert to jpeg
  const buffer = Buffer.from(recipient.photo, "base64");
  fs.writeFileSync("/tmp/2.jpeg", buffer)
  const photo =  fs.createReadStream("/tmp/2.jpeg")


  const caption = await getCaption({recipient, pass, doc})

  const formData ={
    // "chat_id": "68622638",
    chat_id,
    photo,
    caption
  }

  // axios cannot handle multipart/form-data without breaking
  // telegram bot api requires images to be uploaded as a file using multipart
  // so we use a promisified version of request.post
  const post = util.promisify(request.post);
  const {err, res, body} = await post(sendPhotoUrl,{
    headers:{
      "Content-Type": "multipart/form-data"
    },
    formData
  });

  const deleteFile = await util.promisify(fs.unlink);
  await deleteFile("/tmp/2.jpeg");
  return JSON.parse(body)

}


module.exports = {
  sendMessage,
  sendPushNotif
}
