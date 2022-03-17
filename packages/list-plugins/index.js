const { atTracking, createdAt, updatedAt } = require('./lib/tracking/atTracking');
const { byTracking, createdBy, updatedBy } = require('./lib/tracking/byTracking');
const { idTracking, createdId, updatedId } = require('./lib/tracking/idTracking');
const { singleton } = require('./lib/limiting/singleton');
const { logging } = require('./lib/logging');

module.exports = {
  atTracking,
  createdAt,
  updatedAt,

  byTracking,
  createdBy,
  updatedBy,

  idTracking,
  createdId,
  updatedId,

  singleton,
  logging,
};
