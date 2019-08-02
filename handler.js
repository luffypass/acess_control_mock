'use strict';

module.exports.hello = async (event, context, callback) => {
  console.log("BOT_API_KEY", process.env.BOT_API_KEY);
  console.log("CHANNEL_NAME", process.env.CHANNEL_NAME);
  console.log("TEST", process.env.TEST);

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
