// const MongoStore = require('connect-mongo');
const {
  Text,
  Password,
  CalendarDay,
  Checkbox,
  Currency,
  DateTime,
  DateTimeUtc,
  Decimal,
  File,
  Float,
  Images,
  Integer,
  Relationship,
  Select,
  Slug,
  Url,
  Uuid,
  Virtual,
  // Editor,
  // Translate,
} = require('@itoa/fields');
const Editor = require('./fields/Editor');
const { atTracking, regex } = require('./plugins');
const { GraphQLApp } = require('@itoa/app-graphql');
const { PasswordAuthStrategy } = require('@itoa/auth-password');
const { Itoa } = require('@itoa/itoa');
const { MongooseAdapter } = require('@itoa/adapter-mongoose');
const { AdminUIApp } = require('@itoa/app-admin-ui');
var itoa = new Itoa({
  adapter: new MongooseAdapter({
    mongoUri: 'mongodb://localhost:27017/test',
  }),
  session: {
    secret: 'COOKIE',
    // store: new MongoStore({
    //   mongoUrl: DB_SESSION,
    // }),
  },
  appName: 'File',
});
// const authService = {
//   gqlNames: {
//     authenticateMutationName: 'authenticateUserWithPassword',
//     authenticatedQueryName: 'authenticatedUser',
//     unauthenticateMutationName: 'unauthenticateUser',
//   },
//   identityField: 'username',
//   secretField: 'password',
//   uri: process.env.ACCOUNTS,
// };

itoa.createList('User', {
  fields: {
    username: {
      type: Text,
      isRequired: true,
      isUnique: true,
      isIndex: true,
      regex: /^[a-zA-Z0-9]+$/,
      adminConfig: { className: 'col-sm-12 col-md-6' },
      access: { create: true, update: false, delete: true, read: true },
    },
    password: {
      type: Password,
      adminConfig: { className: 'col-sm-12 col-md-6' },
    },
    alpha: { type: Relationship, ref: 'Test.useree' },
    beta: { type: Relationship, ref: 'Test.usersee' },
    gamma: { type: Relationship, ref: 'Test.xusersee', many: true },
  },
  plugins: [atTracking(), regex()],
});
itoa.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username',
    secretField: 'password',
  },
});
//
itoa.createList('Test', {
  fields: {
    editor: { type: Editor },
    calendarDay: { type: CalendarDay },
    checkbox: { type: Checkbox },
    currency: { type: Currency },
    dateTime: { type: DateTime },
    // dateTimeUtc: { type: DateTimeUtc },
    decimal: { type: Decimal },
    // file: { type: File },
    float: { type: Float },
    // images: { type: Images },
    // integer: { type: Integer },
    select: {
      type: Select,
      options: [
        { value: 'first', label: 'nhất' },
        { value: 'second', label: 'nhì' },
      ],
    },
    // slug: { type: Slug },
    // url: { type: Url },
    // uuid: { type: Uuid },
    user: { type: Relationship, ref: 'User' },
    users: { type: Relationship, ref: 'User', many: true },
    useree: { type: Relationship, ref: 'User.alpha' },
    usersee: { type: Relationship, ref: 'User.beta', many: true },
    xusersee: { type: Relationship, ref: 'User.gamma', many: true },
  },
});

itoa.createList('Post', {
  fields: {
    content: { type: Editor },
  },
});
var apps = [new GraphQLApp()];

apps.push(
  new AdminUIApp({
    name: 'Itoa.vn',
    enableDefaultRoute: false,
    // authService,
  })
);

module.exports = {
  itoa,
  apps,
};
