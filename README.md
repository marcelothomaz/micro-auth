# Simple authentication microservice using Fastify and PassportJS

This microservice was created to be used as a standalone application or in a docker container

## Creating priv/pub keys

```bash
$ ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
$ openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

If you add a passphrase, you will have to add a `passphrase` key in config.js as part of the `private` key, please check https://github.com/fastify/fastify-jwt#fastify-jwt-1.

## API Routes

### POST /auth/register

Create a new user and store it in Level DB.

Expects an object with two keys `user` and `password`
Returns an object with a `token` key.

### POST /auth/login

Checks if Level DB contains the specified user and validates its password.

Expects an object with two keys `user` and `password`
Returns an object with a `token` key.
