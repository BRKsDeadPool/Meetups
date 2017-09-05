const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const sharp = require('sharp');
const _ = require('lodash');
const path = require('path');
const os = require('os');

exports.generateThumbnail = functions.storage.object('images/{imageId}').onChange(event => {
    const object = event.data;

    console.log(object);

    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    const resourceState = object.resourceState;
    const metageneration = object.metageneration;
    const SIZES = [200, 400, 600, 900];

    if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
      console.log('This is not an image!');
      return;
    }

    if (_.includes(filePath, '_thumb')) {
      console.log('Already processed image');
      return;
    }

    const fileName = filePath.split('/').pop();
    const bucket = gcs.bucket(fileBucket);
    const tmpFilePath = path.join(os.tmpdir(), fileName);

    return bucket.file(filePath).download({
      destination: tmpFilePath
    })
      .then(() => {
        _.each(SIZES, size => {
          let newFileName = `${fileName}_${size}_thumb.jpg`;
          let newFileTemp = path.join(os.tmpdir(), newFileName);
          let newFilePath = `thums/${newFileName}`

          sharp(tmpFilePath)
            .resize(size, size)
            .crop(sharp.strategy.entropy)
            .toFile(newFileTemp, (err, info) => {
              bucket.upload(newFileTemp, {
                destination: newFilePath
              });
            });
        })
      })
  });
