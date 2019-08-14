/* eslint-disable camelcase */
// check serverless.yml to see how environment variables are  done
// alternatively, check opencerts-functions for a better idea how it is done
const apiKey = process.env.BOT_API_KEY;
const stage = process.env.STAGE;
const chat_id =
  stage === "dev" ? process.env.TEST_CHANNEL : process.env.CHANNEL_ID;

const sendMessageUrl = `https://api.telegram.org/bot${apiKey}/sendMessage`;
const sendPhotoUrl = `https://api.telegram.org/bot${apiKey}/sendPhoto`;
const TIMEZONE = "Asia/Singapore";

const verifyUrl = "https://api-ropsten.opencerts.io/verify";
const contractStore = ["0x590F8DFFdb113e1Dcf4974DEaA9b52A8251cec29"];
module.exports = {
  apiKey,
  stage,
  chat_id,
  verifyUrl,
  contractStore,
  sendMessageUrl,
  sendPhotoUrl,
  TIMEZONE
};
