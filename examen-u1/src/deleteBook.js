const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;

  await dynamodb.delete({
    TableName: "BooksTable",
    Key: { BookID },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Book deleted successfully" }),
  };
};
