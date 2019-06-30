import { SNS } from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';


export const post: APIGatewayProxyHandler = async () =>  {
  const params: SNS.PublishInput = {
    Message: '',
    TopicArn: process.env.snsMessageArn,
  };
  console.log('params', params);

  try {
    const sns = new SNS(); 
    await sns.publish(params).promise();
    console.log('test job published');
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t run tests due an internal error. Please try again later.',
    };
  }
  return {
    statusCode: 202,
    body: JSON.stringify({
      message: 'Test Run Started. Check status by polling the url found in the location header.',
    })
  };
}
