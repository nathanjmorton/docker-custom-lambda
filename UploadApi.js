const filesClient = require("./FilesClient");
const s3Client = require("./S3Client");

class UploadApi {
  async streamUpload({
    uploadType = "files",
    sourceKey,
    sourceBucket,
    targetKey,
    targetBucket,
  }) {
    // Stream to read the file from the bucket
    const readStream = s3Client.readStreamFromS3({
      Key: sourceKey,
      Bucket: sourceBucket,
    });
    // Stream to upload to the bucket
    let writeStreamGlobal, uploadGlobal;
    if (uploadType === "s3") {
      console.log("uploading to s3");
      const { writeStream, upload } = s3Client.writeStreamToS3({
        Key: targetKey,
        Bucket: targetBucket,
      });
      writeStreamGlobal = writeStream;
      uploadGlobal = upload;
    } else if (uploadType === "files") {
      console.log("uploading to files");
      const { writeStream, upload } = filesClient.writeStreamToFiles({
        Key: targetKey,
        Bucket: targetBucket,
      });
      writeStreamGlobal = writeStream;
      uploadGlobal = upload;
    }
    // Trigger the streams
    readStream.pipe(writeStreamGlobal);
    // Wait for the file to upload
    await uploadGlobal;
  }
}

const uploadApi = new UploadApi();
module.exports = uploadApi;

// Usage example:
// uploadApi.streamUpload({
//   // uploadType: "s3",
//   sourceKey: "20230321/20230321.csv",
//   sourceBucket: "bronifty.xyz",
//   targetKey: "20230321.csv",
//   targetBucket: "bronifty.xyz.target",
// });
