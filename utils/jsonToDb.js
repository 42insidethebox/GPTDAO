const fs = require("fs");
const path = require("path");
const Lesson = require("../models/lessonModel");

const importData = async () => {
  // Get the absolute path to the data.json file
  const dataFilePath = path.join(__dirname, "data.json");

  // Read the JSON file
  const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // Insert each title as a new lesson in the MongoDB database
  for (let i = 0; i < jsonData.length; i++) {
    const lessonData = jsonData[i];

    const newLesson = new Lesson({
      title: lessonData.title,
    });

    await newLesson.save((err) => {
      if (err) {
        console.log(`Error inserting class ${lessonData.title}: ${err}`);
      } else {
        console.log(`Inserted class ${lessonData.title} successfully!`);
      }
    });
  }
};

const updatePart1 = async () => {
  // Get the absolute path to the data2.json file
  const data2FilePath = path.join(__dirname, "data2.json");

  // Read the JSON file
  const jsonData2 = JSON.parse(fs.readFileSync(data2FilePath, "utf8"));

  // Fetch all lessons from the database
  const lessons = await Lesson.find({});

  // Update each lesson with the corresponding part_1 from data2.json
  for (let i = 0; i < jsonData2.length && i < lessons.length; i++) {
    const lessonPart1 = jsonData2[i].part_1;

    try {
      const updatedLesson = await Lesson.findByIdAndUpdate(
        lessons[i]._id,
        { part_1: lessonPart1 },
        { new: true, useFindAndModify: false }
      );

      console.log(`Updated part_1 for class ${lessons[i].title} successfully!`);
    } catch (err) {
      console.log(
        `Error updating part_1 for class ${lessons[i].title}: ${err}`
      );
    }
  }
};

const updatePart2 = async () => {
  // Get the absolute path to the data3.json file
  const data3FilePath = path.join(__dirname, "data3.json");

  // Read the JSON file
  const jsonData3 = JSON.parse(fs.readFileSync(data3FilePath, "utf8"));

  // Fetch all lessons from the database
  const lessons = await Lesson.find({});

  // Update each lesson with the corresponding part_2 from data3.json
  for (let i = 0; i < jsonData3.length && i < lessons.length; i++) {
    const lessonPart2 = jsonData3[i].part_2;

    try {
      const updatedLesson = await Lesson.findByIdAndUpdate(
        lessons[i]._id,
        { part_2: lessonPart2 },
        { new: true, useFindAndModify: false }
      );

      console.log(`Updated part_2 for class ${lessons[i].title} successfully!`);
    } catch (err) {
      console.log(
        `Error updating part_2 for class ${lessons[i].title}: ${err}`
      );
    }
  }
};

module.exports.updatePart2 = updatePart2;

module.exports = {
  importData,
  updatePart1,
  updatePart2,
};
/*
const deleteAllLessons = async () => {
  try {
    await Lesson.deleteMany({});
    console.log("All lessons deleted successfully!");
  } catch (err) {
    console.log(`Error deleting all lessons: ${err}`);
  }
};

(async () => {
  await deleteAllLessons();
})();
*/
