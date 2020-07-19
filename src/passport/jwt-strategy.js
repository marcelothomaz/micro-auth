const fp = require("fastify-plugin")
const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")

async function authenticate(request, reply, done) {
   try {
      request.jwtVerify()

      done()
   } catch (err) {
      done(new Error("Token not valid"))
   }
}

function strategy(fastify, opts, done) {
   fastify.decorate("authenticate", authenticate)
   done()
}

module.exports = fp(strategy)
