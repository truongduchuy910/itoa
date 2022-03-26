const { LocalFileAdapter } = require('@itoa/file-adapters');
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
var Jimp = require('jimp');
const { Images, File } = require('@itoa/fields');
var mmm = require('mmmagic');
var magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

AWS.config.update({
  accessKeyId: `TDMFXKEBPQ87UCQBSLPK`,
  secretAccessKey: `KI3VHCO2mnTDpxkt23mCHbYV5d5CRPn8PD8sYJPp`,
  region: 'hn',
  endpoint: 'https://hn.ss.bfcplatform.vn',
  apiVersions: {
    s3: '2006-03-01',
  },
});
const Bucket = 'accounts';
const sizes = [
  { name: 'sm', size: 187 },
  { name: 'md', size: 620 },
  { name: '', size: 1024 },
];

const s3 = new AWS.S3();
/**
 * Make directions to store
 */
sizes.map(size => {
  const dir = path.join(Bucket, '/upload/img', size.name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
/**
 * Image Adapter change the size before save
 * File Adapter not do anything
 */
const imageAdapter = new LocalFileAdapter({
  src: Bucket + '/upload/img',
  path: '/upload/img/sm',
});
const fileAdapter = new LocalFileAdapter({
  src: Bucket + '/upload/file',
  path: '/upload/file',
});
/**
 *
 */
var count = { remove: 0, resize: 0, exist: 0, valid: 0, missing: 0 };
/**
 * Upload local to S3
 * @param {*} file
 */
async function upload(file) {
  const filePath = file;
  magic.detectFile(filePath, function (err, mimetype) {
    if (err) throw err;
    const uploadParams = { Bucket, Key: '', Body: '' };
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = path.join(filePath.replace(Bucket + '/', ''));
    uploadParams.ContentType = mimetype;
    uploadParams.ACL = 'public-read';
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Upload Success', data.Location);
      }
    });
  });
}
/**
 * Resize original file
 * @param {*} filename
 * @returns
 */
async function resize(filename) {
  if (!filename) return;
  //
  const _filename = path.join(Bucket, '/upload/img', filename);
  if (!fs.existsSync(_filename)) {
    count.missing++; // normal missing
    return; // - MISSING NORMAL FILE!
  }
  //
  count.exist++; // normal exist
  let destinations = [];
  // MOVE
  for (var i in sizes) {
    const size = sizes[i];
    const des = size.name.length
      ? path.join(Bucket, '/upload/img', size.name, filename)
      : path.join(Bucket, '/upload/img', filename);
    try {
      if (_filename !== des) fs.copyFileSync(_filename, des, fs.constants.COPYFILE_EXCL);
    } catch (err) {
      console.log(err, des);
      //
    }
    // RESIZE, VALID
    try {
      destinations.push(des);
      const _dest = await Jimp.read(des);
      const width = _dest.getWidth();
      const height = _dest.getHeight();
      if (width > height) {
        if (width > size.size) {
          _dest.resize(size.size, Jimp.AUTO).write(des);
          count.resize++;
        } else {
          count.valid++;
        }
      } else {
        if (height > size.size) {
          _dest.resize(Jimp.AUTO, size.size).write(des);
          count.resize++;
        } else {
          count.valid++;
        }
      }
    } catch (err) {
      //
      console.log(err, des);
    }
  }
  return destinations;
}

async function removes(filename) {
  if (!filename) return;
  sizes.map(size => {
    const des = path.join(Bucket, '/upload/img', size.name, filename);
    // remove local
    fs.unlink(des, err => {
      if (err) console.log(err);
    });
    // remove remote
    const params = {
      Bucket,
      Key: des.replace(Bucket + '/', ''),
    };
    s3.deleteObject(params, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  });
}
const params = [
  {
    Bucket,
    Key: '/seller/upload/img/623ecb9719f824189756cf6e-_118621270_1ea6e9a9-d242-4972-950d-29d4c69d64b0.jpg',
  },
  {
    Bucket,
    Key: '/seller/upload/img/md/623ecb9719f824189756cf6e-_118621270_1ea6e9a9-d242-4972-950d-29d4c69d64b0.jpg',
  },
  {
    Bucket,
    Key: '/seller/upload/img/sm/623ecb9719f824189756cf6e-_118621270_1ea6e9a9-d242-4972-950d-29d4c69d64b0.jpg',
  },
];
params.map(param => {
  s3.deleteObject(param, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log('data', data); // successful response
  });
});
/**
 * IMAGE HOOK
 * @param {*} file
 * @param {LocalFileAdapter} adapter
 * @returns
 */
function imageHooks(file) {
  return {
    resolveInput: async ({ resolvedData = {}, existingItem = {}, operation }) => {
      const _new = resolvedData[file];
      const _old = existingItem[file];
      if (operation === 'create') {
        if (_new) {
          resize(_new.filename).then(destinations => {
            destinations.map(des => {
              upload(des);
            });
          });
        }
      }
      if (operation === 'update') {
        if (_new) {
          resize(_new.filename).then(destinations => {
            destinations.map(des => {
              upload(des);
            });
          });
        }
        if (_new && _old) removes(_old.filename);
      }
      return _new;
    },
    afterDelete: async ({ resolvedData = {}, existingItem = {} }) => {
      const _old = existingItem[file];
      if (_old) removes(_old.filename);
      return resolvedData;
    },
  };
}
/**
 * FILE HOOK
 * @param {*} file
 * @returns
 */
function fileHooks(file) {
  return {
    beforeChange: async ({ resolvedData, existingItem = {} }) => {
      if (existingItem[file]) {
        await imageAdapter.delete(existingItem[file]);
      }
      return resolvedData;
    },
    afterDelete: async ({ resolvedData, existingItem = {} }) => {
      if (existingItem[file]) {
        await imageAdapter.delete(existingItem[file]);
      }
      return resolvedData;
    },
  };
}
/**
 *
 */
function image(field = 'image', label, isRequired = false) {
  return {
    [field]: {
      type: File,
      adapter: imageAdapter,
      hooks: imageHooks(field),
      label,
      isRequired,
      adminConfig: { className: 'col-sm-12 col-md-6', host: 'localhost:3004' },
      cacheHint: {
        maxAge: 3600,
      },
    },
  };
}
function file(field = 'file', label, isRequired = false) {
  return {
    [field]: {
      type: File,
      adapter: fileAdapter,
      hooks: fileHooks('file'),
      label,
      isRequired,
      adminConfig: { className: 'col-sm-12 col-md-6' },
      cacheHint: {
        maxAge: 3600,
      },
    },
  };
}
function images(label) {
  return {
    type: Images,
    ref: 'UploadImage',
    search: 'alt',
    file: 'file',
    label,
    many: true,
  };
}
module.exports = {
  image,
  file,
  images,
  Bucket,
  sizes,
};
