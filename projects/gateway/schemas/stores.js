const { LocalFileAdapter } = require('@itoa/file-adapters');
const path = require('path');
const fs = require('fs');
// var Jimp = require('jimp');
const { Images, File } = require('@itoa/fields');
const public_path = './public';
const sizes = [
  { name: 'sm', size: 187 },
  { name: 'md', size: 620 },
  { name: '', size: 1024 },
];

sizes.map(size => {
  const dir = path.join(public_path, '/upload/img', size.name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const imageAdapter = new LocalFileAdapter({
  src: public_path + '/upload/img',
  path: '/upload/img/sm',
});
const fileAdapter = new LocalFileAdapter({
  src: public_path + '/upload/file',
  path: '/upload/file',
});
var count = { remove: 0, resize: 0, exist: 0, valid: 0, missing: 0 };

// async function resize(filename) {
//   if (!filename) return;
//   //
//   const _filename = path.join(public_path, '/upload/img', filename);
//   if (!fs.existsSync(_filename)) {
//     count.missing++; // normal missing
//     return; // - MISSING NORMAL FILE!
//   }
//   //
//   count.exist++; // normal exist
//   // MOVE
//   for (var i in sizes) {
//     const size = sizes[i];
//     const des = size.name.length
//       ? path.join(public_path, '/upload/img', size.name, filename)
//       : path.join(public_path, '/upload/img', filename);
//     try {
//       if (_filename !== des) fs.copyFileSync(_filename, des, fs.constants.COPYFILE_EXCL);
//     } catch (err) {
//       console.log(err, des);
//       //
//     }
//     // RESIZE, VALID
//     try {
//       const _dest = await Jimp.read(des);
//       const width = _dest.getWidth();
//       const height = _dest.getHeight();
//       if (width > height) {
//         if (width > size.size) {
//           _dest.resize(size.size, Jimp.AUTO).write(des);
//           count.resize++;
//         } else {
//           count.valid++;
//         }
//       } else {
//         if (height > size.size) {
//           _dest.resize(Jimp.AUTO, size.size).write(des);
//           count.resize++;
//         } else {
//           count.valid++;
//         }
//       }
//     } catch (err) {
//       //
//       console.log(err, des);
//     }
//   }
// }
async function removes(filename) {
  if (!filename) return;
  sizes.map(size => {
    const des = path.join(public_path, '/upload/img', size.name, filename);
    fs.unlink(des, err => {
      if (err) console.log(err);
    });
  });
}
/**
 * IMAGE HOOK
 * @param {*} file
 * @param {LocalFileAdapter} adapter
 * @returns
 */
// function imageHooks(file) {
//   return {
//     resolveInput: async ({ resolvedData = {}, existingItem = {}, operation }) => {
//       const _new = resolvedData[file];
//       const _old = existingItem[file];
//       if (operation === 'create') {
//         if (_new) resize(_new.filename);
//       }
//       if (operation === 'update') {
//         if (_new) resize(_new.filename);
//         if (_new && _old) removes(_old.filename);
//       }
//       return _new;
//     },
//     afterDelete: async ({ resolvedData = {}, existingItem = {} }) => {
//       const _old = existingItem[file];
//       if (_old) removes(_old.filename);
//       return resolvedData;
//     },
//   };
// }
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
      // hooks: imageHooks(field),
      label,
      isRequired,
      adminConfig: { className: 'col-sm-12 col-md-6' },
      cacheHint: {
        maxAge: 80,
      },
    },
  };
}
function file(field = 'file', label, isRequired = false) {
  return {
    [field]: {
      type: File,
      adapter: fileAdapter,
      // hooks: fileHooks('file'),
      label,
      isRequired,
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
  public_path,
  sizes,
};
