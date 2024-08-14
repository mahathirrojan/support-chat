import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

// Configure the AWS SDK for JavaScript
AWS.config.update({
  region: 'us-east-1', // Replace with your desired region
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const client = new AWS.BedrockRuntime();

  const userMessage = req.body.message;

  const conversation = [
    {
      role: 'user',
      content: [{ text: userMessage }],
    },
  ];

  try {
    const response = await client
      .converse({
        modelId: 'amazon.titan-text-premier-v1:0',
        messages: conversation,
        inferenceConfig: {
          maxTokens: 1024,
          stopSequences: [],
          temperature: 0.7,
          topP: 0.9,
        },
        additionalModelRequestFields: {},
      })
      .promise();

    const responseText = response.output.message.content[0].text;
    res.status(200).json({ message: responseText });
  } catch (error) {
    console.error('Error invoking the model:', error);
    res.status(500).json({ error: `Failed to invoke model: ${error.message}` });
  }
}
