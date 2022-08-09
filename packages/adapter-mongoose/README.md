<!--[meta]
section: api
subSection: database-adapters
title: Mongoose adapter
[meta]-->

# Mongoose database adapter

## Hướng dẫn

```javascript
const { MongooseAdapter } = require('@itoa/adapter-mongoose');

const itoa = new Itoa({
  adapter: new MongooseAdapter({...}),
});
```

## Cấu hình

### `mongoUri` (bắt buộc)

Tham số này được sử dụng trong `mongoose.connect()`.

**_Default:_** Biến môi trường mặc định được sử dụng xem bên dưới hoặc `'mongodb://localhost/<DATABASE_NAME>'`

Nếu không có cấu hình riêng, Itoa.js sẽ tìm kiếm sử dụng các biến môi trường sau:

- `CONNECT_TO`
- `DATABASE_URL`
- `MONGO_URI`
- `MONGODB_URI`
- `MONGO_URL`
- `MONGODB_URL`
- `MONGOLAB_URI`
- `MONGOLAB_URL`

### Mongoose options (tùy chọn)

Tham số này cũng được sử dụng trong `mongoose.connect()`.

**_Default:_**

```javascript
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}
```

Xem thêm tài liệu [Mongoose docs](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect) để biết thêm thông tin chi tiết.
