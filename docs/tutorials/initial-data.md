<!--[meta]
section: tutorials
title: Seeding data
order: 3
[meta]-->

# Seeding data

This guide will show you how to create a `User` list and add initial data to it using the `createItems` function. This process is also called `seeding`.

> **Note:** In a previous chapter the code was split up over separate files, while this is preferred in a real code base, in this part everything is put in one file for clarity reasons.

## List setup

### Install packages

This chapter will use a different `User` schema than previous chapters and instead of a `Todo` list, there will be a `Post` list.
It is best to start from a fresh project and start from an empty database (delete data from previous chapters).
Also, make sure to have all of the following packages installed:

```shell allowCopy=false showLanguage=false
yarn add @itoa/itoa
yarn add @itoa/adapter-mongoose
yarn add @itoa/app-graphql
yarn add @itoa/fields
yarn add @itoa/app-admin-ui
yarn add @itoa/auth-password
yarn add @itoa/server-side-graphql-client
```

### Preparation

First let's create a `User` list and add a `PasswordAuthStrategy`.
The code in `index.js`:

```javascript
const { Itoa } = require('@itoa/itoa');
const { PasswordAuthStrategy } = require('@itoa/auth-password');
const { Text, Checkbox, Password } = require('@itoa/fields');
const { GraphQLApp } = require('@itoa/app-graphql');
const { AdminUIApp } = require('@itoa/app-admin-ui');
const { MongooseAdapter } = require('@itoa/adapter-mongoose');

const itoa = new Itoa({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/itoa' }),
});

itoa.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    isAdmin: { type: Checkbox },
    password: { type: Password },
  },
});

const authStrategy = itoa.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  itoa,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: 'example-project', enableDefaultRoute: true, authStrategy }),
  ],
};
```

> **Tip:** A similar setup can be achieved by running the Itoa CLI `yarn create itoa-5-app` and selecting `Starter (Users + Authentication)`.
> This starter project has a `User` list, `PasswordAuthStrategy` and seeding of the database already configured. For now, we will proceed manually.

## Creating items

The [`createItems`](https://www.itoa.vn/itoa/server-side-graphql-client/#createitems) utility function requires a config object argument.
It has the following `required` keys:

- `itoa`: a Itoa instance
- `listKey`: the Itoa list name
- `items`: the array of objects to be created.

```javascript
const { createItems } = require('@itoa/server-side-graphql-client');

await createItems({
  itoa,
  listKey: 'User',
  items: [
    {
      data: {
        name: 'John Duck',
        email: 'john@duck.com',
        password: 'dolphins',
      },
    },
    {
      data: {
        name: 'Barry',
        email: 'bartduisters@bartduisters.com',
        password: 'dolphins',
      },
    },
  ],
});
```

**Note**: The format of the objects in the `items` array must align with the schema setup of the corresponding list name.
As an example in our schema, the `email` field has `isUnique:true` constraint, therefore it would not be possible for the above code to generate users with exactly same email.

Example on how to `seed` the data upon database connection:

```javascript
const { createItems } = require('@itoa/server-side-graphql-client');

const itoa = new Itoa({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/itoa' }),
  onConnect: async itoa => {
    // Reset the database each time for this example
    await itoa.adapter.dropDatabase();
    await createItems({
      itoa,
      listKey: 'User',
      items: [
        {
          data: {
            name: 'John Duck',
            email: 'john@duck.com',
            password: 'dolphins',
          },
        },
        {
          data: {
            name: 'Barry',
            email: 'bartduisters@bartduisters.com',
            password: 'dolphins',
          },
        },
      ],
    });
  },
});
```

Start the application and visit the Admin UI, two users are available on startup.
You can log in to the Admin UI with the email `john@duck.com` and password `dolphins`.

> **Note:** In this example the same two users would be generated _every_ startup.
> Since email should be unique, this would cause a duplicate error to show up.
> To avoid this, we clear the database before starting Itoa each time.

## Relationships

The `items` in the `createItems` config object has the data type of GraphQL `[listKey]sCreateInput`.
In our example, it's the `UsersCreateInput` which itoa created for us as part of the schema.

Consequently, while seeding it's possible to create relationships between items using itoa `connect` [nested mutations](https://www.itoa.vn/itoa/fields/src/types/relationship/#nested-mutations).

### Single relationships

Add the `Relationship` field to the imports:

```javascript
const { Text, Checkbox, Password, Relationship } = require('@itoa/fields');
```

Create a list with a relationship to another list:

```javascript
itoa.createList('Post', {
  fields: {
    title: { type: Text },
    author: { type: Relationship, ref: 'User', many: false },
  },
});
```

As part of `connect` nested mutation, we need to provide the id of the item for which the single relationship is required.
This implies that we need to extract the id of the previously created items.

Example on how to seed an item with a relationship using `connect` nested mutation:

```javascript
await createItems({
  itoa,
  listKey: 'Post',
  items: [
    {
      data: {
        title: 'Hello World',
        author: {
          // Extracting the id from `users` array
          connect: { id: users.find(user => user.name === 'John Duck').id },
        },
      },
    },
  ],
});
```

The full example:

```javascript
const itoa = new Itoa({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/itoa' }),
  onConnect: async itoa => {
    // Reset the database each time for this example
    await itoa.adapter.dropDatabase();

    // 1. Insert the user list first to obtain the user IDs
    const users = await createItems({
      itoa,
      listKey: 'User',
      items: [
        {
          data: {
            name: 'John Duck',
            email: 'john@duck.com',
            password: 'dolphins',
          },
        },
        {
          data: {
            name: 'Barry',
            email: 'bartduisters@bartduisters.com',
            password: 'dolphins',
          },
        },
      ],
      returnFields: 'id, name',
    });

    // 2. Insert `Post` data, with the required relationships, via `connect` nested mutation.
    await createItems({
      itoa,
      listKey: 'Post',
      items: [
        {
          data: {
            title: 'Hello World',
            author: {
              // Extracting the id from `users` array
              connect: {
                id: users.find(user => user.name === 'John Duck').id,
              },
            },
          },
        },
      ],
    });
  },
});
```

Clear the database, then start Itoa and visit the Admin UI to see that two users are generated and one post is generated.
The post has an `author` named `John Duck`.
In the database `author` will be the ID of the user with name John Duck

### Many relationships

In general, a user can have many posts.
We can set up our `User` list to refer to `Posts` with a one to many relationship by adding a `posts` field

```javascript
itoa.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true },
    isAdmin: { type: Checkbox },
    password: { type: Password },
    posts: { type: Relationship, ref: 'Post.author', many: true },
  },
});
```

and then updating our `Post.author` field to refer to `User.posts`.

```javascript
itoa.createList('Post', {
  fields: {
    title: { type: Text },
    author: { type: Relationship, ref: 'User.posts', many: false },
  },
});
```

Note that `User.posts` has `{ many: true }`, while `Post.author` has `{ many: false }`.

Following the same pattern as discussed above, we can easily establish a `to-many` relationship via `connect` [nested mutations](https://www.itoa.vn/itoa/fields/src/types/relationship/#nested-mutations) approach.
Instead of passing a single item id, we are required to pass an array of item ids.

**Note**: We need to create posts first as we're going to use the post ids to create `to-many` relationship with user items.

To associate all the posts where `title` contains the word `React`:

In action:

```javascript
const itoa = new Itoa({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/itoa' }),
  onConnect: async itoa => {
    // Reset the database each time for this example
    await itoa.adapter.dropDatabase();

    // 1. Create posts first as we need generated ids to establish relationship with user items.
    const posts = await createItems({
      itoa,
      listKey: 'Post',
      items: [
        { data: { title: 'Hello Everyone' } },
        { data: { title: 'Talking about React' } },
        { data: { title: 'React is the Best' } },
        { data: { title: 'Itoa Rocks' } },
      ],
      returnFields: 'id, title',
    });

    // 2. Insert User data with required relationship via nested mutations. `connect` requires an array of post item ids.
    await createItems({
      itoa,
      listKey: 'User',
      items: [
        {
          data: {
            name: 'John Duck',
            email: 'john@duck.com',
            password: 'dolphins',
            posts: {
              // Filtering list of items where title contains the word `React`
              connect: posts
                .filter(post => /\bReact\b/i.test(post.title))
                .map(post => ({ id: post.id })),
            },
          },
        },
        {
          data: {
            name: 'Barry',
            email: 'bartduisters@bartduisters.com',
            password: 'dolphins',
            isAdmin: true,
          },
        },
      ],
    });
  },
});
```

Start the Itoa application and visit the Admin UI.
Take a look at the user `John Duck`, he has two posts associated with him (there were two posts with the word `React` in the `title`).

If you want to explore other utility functions for `CRUD` operations, please refer to [server-side GraphQL client](https://www.itoa.vn/itoa/server-side-graphql-client) API for more details.
