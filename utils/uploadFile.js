const aws = require("aws-sdk");

// I can either upload the file directly from the client, or include this logic in the server.
// For former, I will have to modify the logic below so that the file is properly renamed to conform with SQL Database.
// Latter is simpler implementation but greater strain on server resources. However I could use a third-party image validation middleware

// import credentials from a .env file
require("dotenv").config();

module.exports.uploadToS3 = function (file, key) {
  // S3 bucket object uses credentials for rrich-kray user, an IAM role that has access only to PutObject
  // and GetObject actions for the rrich-pinterest-clone-bucket
  // Key for the file will be the filename, which is how the image files will be accessed on the frontend
  // This method will be provided with a renamed file via the post controller
  const s3Obj = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    params: {
      Bucket: process.env.AWS_BUCKET,
    },
  });

  s3Obj.upload(
    {
      Key: key,
      Body: file,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("Uploaded data at " + data.Location);
      }
    }
  );
};
