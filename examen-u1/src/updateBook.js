const AWS = require("aws-sdk");

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;
  const { Title, Author, PublishedYear, Genre } = JSON.parse(event.body);

  const updatedBook = await dynamodb.update({
    TableName: "BooksTable",
    Key: { BookID },
    UpdateExpression: "set Title = :Title, Author = :Author, PublishedYear = :PublishedYear, Genre = :Genre",
    ExpressionAttributeValues: {
      ":Title": Title,
      ":Author": Author,
      ":PublishedYear": PublishedYear,
      ":Genre": Genre,
    },
    ReturnValues: "ALL_NEW",
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(updatedBook.Attributes),
  };
};
