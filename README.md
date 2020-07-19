# Simple authentication microservice using Fatify and PassportJS

This microservice was created to be using in a dockerized environment

## Creating priv/pub keys

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

## API Routes

### POST /auth/register

Create a new user and store it in Level DB.

Expects an object with two keys `user` and `password`
Returns an object with a `token` key.

### POST /auth/login

Checks if Level DB contains the specified user and validates its password.

Expects an object with two keys `user` and `password`
Returns an object with a `token` key.
