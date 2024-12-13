const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { Title, Author, PublishedYear, Genre } = JSON.parse(event.body);
  const BookID = v4();

  const newBook = { BookID, Title, Author, PublishedYear, Genre };

  await dynamodb.put({
    TableName: "BooksTable",
    Item: newBook,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newBook),
  };
};
