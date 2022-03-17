import { Implementation } from '@itoa/fields';
import { MongooseFieldAdapter } from '@itoa/adapter-mongoose';

export class MongoIdImplementation extends Implementation {
  get _supportsUnique() {
    return true;
  }

  gqlOutputFields() {
    return [`${this.path}: ID${this.isPrimaryKey ? '!' : ''}`];
  }
  gqlOutputFieldResolvers() {
    return { [`${this.path}`]: item => item[this.path] };
  }
  gqlQueryInputFields() {
    return [...this.equalityInputFields('ID'), ...this.inInputFields('ID')];
  }
  gqlUpdateInputFields() {
    return [`${this.path}: ID`];
  }
  gqlCreateInputFields() {
    return [`${this.path}: ID`];
  }
  getBackingTypes() {
    if (this.path === 'id') {
      return { [this.path]: { optional: false, type: 'string' } };
    }
    return { [this.path]: { optional: true, type: 'string | null' } };
  }
}

const validator = a => (a ? /^[0-9a-fA-F]{24}$/.test(a.toString()) : true);
const normaliseValue = a => (a ? a.toString().toLowerCase() : null);

export class MongooseMongoIdInterface extends MongooseFieldAdapter {
  addToMongooseSchema(schema, mongoose) {
    // If this field is the primary key we actually don't have to add it; it's implicit
    if (this.field.isPrimaryKey) return;

    const schemaOptions = {
      type: mongoose.Schema.Types.ObjectId,
      validate: {
        validator: this.buildValidator(validator),
        message: '{VALUE} is not a valid Mongo ObjectId',
      },
    };
    schema.add({
      [this.field.isPrimaryKey ? '_id' : this.path]: this.mergeSchemaOptions(
        schemaOptions,
        this.config
      ),
    });
  }

  setupHooks({ addPreSaveHook, addPostReadHook }) {
    if (!this.field.isPrimaryKey) return;

    addPreSaveHook(item => {
      if (item.id) {
        item._id = item.id;
        delete item.id;
      }
      return item;
    });
    addPostReadHook(itemOrModel => {
      // Sometimes this is called with a mongoose model, sometimes with an object and sometimes with null
      // I do no know why
      const item = itemOrModel && itemOrModel.toObject ? itemOrModel.toObject() : itemOrModel;

      if (item && item._id) {
        item.id = item._id.toString();
        delete item._id;
      }
      return item;
    });
  }

  getQueryConditions(dbPath) {
    const mongoose = this.listAdapter.parentAdapter.mongoose;
    return {
      ...this.equalityConditions(
        this.field.isPrimaryKey ? '_id' : dbPath,
        s => s && mongoose.Types.ObjectId(s)
      ),
      //NOTE: ObjectId(null) returns a new ObjectId value
      ...this.inConditions(
        this.field.isPrimaryKey ? '_id' : dbPath,
        s => s && mongoose.Types.ObjectId(s)
      ),
    };
  }
}
