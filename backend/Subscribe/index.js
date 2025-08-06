const { SNSClient, SubscribeCommand } = require("@aws-sdk/client-sns");

const sns = new SNSClient({ region: "us-east-1" });

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  if (!email || !email.includes("@")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid email address." }),
    };
  }

  const command = new SubscribeCommand({
    Protocol: "email",
    Endpoint: email,
    TopicArn: process.env.WEEKLY_TOPIC_ARN,
  });

  try {
    await sns.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "You’ve been signed up for weekly updates!" }),
    };
  } catch (err) {
    console.error("SNS subscription error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Subscription failed. Please try again later." }),
    };
  }
};
