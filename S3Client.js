const stream = require("stream");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const S3 = new AWS.S3();

class S3Client {
  // Read stream for downloading from S3
  readStreamFromS3({ Bucket, Key }) {
    return S3.getObject({ Bucket, Key }).createReadStream();
  }

  // Write stream for uploading to S3
  writeStreamToS3({ Bucket, Key }) {
    const pass = new stream.PassThrough();

    return {
      writeStream: pass,
      upload: S3.upload({
        Key,
        Bucket,
        Body: pass,
      }).promise(),
    };
  }
}

const s3Client = new S3Client();
module.exports = s3Client;

// Usage example:
// uploadApi.streamUpload({
//   // uploadType: "s3",
//   sourceKey: "20230321/20230321.csv",
//   sourceBucket: "bronifty.xyz",
//   targetKey: "20230321.csv",
//   targetBucket: "bronifty.xyz.target",
// });
