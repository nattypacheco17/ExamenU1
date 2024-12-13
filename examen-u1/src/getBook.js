const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;

  const result = await dynamodb.get({
    TableName: "BooksTable",
    Key: { BookID },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};
