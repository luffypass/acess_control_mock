'use strict';

const axios = require("axios");

module.exports.hello = async (event, context, callback) => {
  const apiKey = process.env.BOT_API_KEY;
  const channel = process.env.CHANNEL_ID;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.sendTestMessage = async ( event, context, callback ) => {
  const apiKey = process.env.BOT_API_KEY;
  const channel = process.env.STAGE === "dev" ? process.env.TEST_CHANNEL : process.env.CHANNEL_ID;

  const url = `https://api.telegram.org/bot${apiKey}/sendMessage`
  const result = await axios(
    {
      method: "post",
      url,
      responseType: "json",
      data: {
        chat_id: channel,
        text: "I am Alive!!!"
      }
    }
  );
  console.log(JSON.parse(result));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'message sent',
        input: event,
      },
      null,
      2
    ),
  };
} 


module.exports.getRequirement = async ( event, context, callback ) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      details: ["name", "age", "photo", "expiry_date"]
    }, null, 2)
  }
}