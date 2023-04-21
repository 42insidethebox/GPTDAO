const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const { importData, updatePart1, updatePart2 } = require("./utils/jsonToDb");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(async () => {
  console.log("DB connection successful!");

  // Import the data from the JSON file
  //await importData();
  //await updatePart1();
  //await updatePart2();
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port $p{port}...`);
});
