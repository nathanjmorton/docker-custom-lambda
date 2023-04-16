const uploadApi = require("./UploadApi");
const generateDateRangeArray = require("./generateDateRangeArray");

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const numberOfDays = requestBody.numberOfDays || 7;
  const uploadType = requestBody.uploadType || "files";

  const dateRangeArray = generateDateRangeArray(numberOfDays);
  console.log(dateRangeArray);

  const uploadPromises = dateRangeArray.map(async (date) => {
    try {
      await uploadApi.streamUpload({
        uploadType,
        sourceKey: `${date}/${date}.csv`,
        sourceBucket: "bronifty.xyz",
        targetKey: `${date}.csv`,
        targetBucket: "bronifty.xyz.target",
      });
    } catch (error) {
      console.error(`Error uploading ${date}:`, error);
      return;
    }
  });

  try {
    await Promise.all(uploadPromises);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Files uploaded successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while uploading the files",
      }),
    };
  }
};
