# Isomorphy

Isomorphic framework using React

## Motivations

When building apps usually you go through the repetitive process of Creating a database table, creating a bunch of CRUD endpoints, creating a client side api to call your endpoint.
If just had to do this once say `useEntity("users", userSchema)` and this sets up all of that for you that seems like a neat idea.

There are other frameworks that have similar functionality. But even so you usually end up with just as much boilerplate but it's branded 😂. 

## Getting running
Clone the repo
```
git clone https://github.com/GeraldHost/isomorphy.git
```
Build the server code (with babel)
```
npm run build
```
Build the client bundle (with webpack)
```
npm run build:client
```
Run the server
```
node build/src/index.js
```

