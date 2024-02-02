// const {
//     DB_USER,
//     DB_PASSWORD,
//     DB_HOST,
//     DB_NAME,
//   } = process.env;

const DB_USER = "testuser";
const DB_PASSWORD = "testpassword";
const DB_NAME = "testdb";
const DB_HOST = "testdb";

module.exports = {
    url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}`
}