"use strict"
var Fastify = require("fastify")
var { port: PORT, fastifyJwtConfig } = require("./config")

const dev = process.env.NODE_ENV !== "production"

const fastify = Fastify({
   logger: dev,
})

fastify.register(require("fastify-jwt"), fastifyJwtConfig)
fastify.register(require("fastify-leveldb"), {
   name: "authdb",
   path: "auth.db",
})
fastify.register(require("fastify-auth"))
fastify.register(require("./src/passport/jwt-strategy"))
fastify.register(require("./src/routes"))

const start = async () => {
   try {
      await fastify.listen(PORT)
      fastify.log.info(`> Listening on port ${PORT}`)
   } catch (err) {
      fastify.log.error(err)
      process.exit(1)
   }
}
start()
