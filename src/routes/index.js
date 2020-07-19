const fp = require("fastify-plugin")
const bcrypt = require("bcrypt")

const saltRounds = 10

function routes(fastify, options, done) {
   fastify.post(
      "/register",
      {
         schema: {
            body: {
               type: "object",
               properties: {
                  user: { type: "string" },
                  password: { type: "string" },
               },
               required: ["user", "password"],
            },
         },
      },
      async (req, reply) => {
         try {
            let existingUser = await fastify.level.authdb.get(req.body.user)
            if (existingUser) return { msg: "Username already taken!" }
            req.log.info("Creating new user")
            let hash = await bcrypt.hash(req.body.password, saltRounds)
            await fastify.level.authdb.put(req.body.user, hash)

            let token = await fastify.jwt.sign(req.body)
            req.log.info("User created")
            reply.send({ token })
         } catch (err) {
            req.log.error(err)
            return { msg: "Error creating user" }
         }
      }
   )

   fastify.post(
      "/login",
      {
         schema: {
            body: {
               type: "object",
               properties: {
                  user: { type: "string" },
                  password: { type: "string" },
               },
               required: ["user", "password"],
            },
         },
      },
      async (req, reply) => {
         try {
            let pw = await fastify.level.authdb.get(req.body.user)
            if (!pw) return { msg: "Incorrect username or password" }
            let match = await bcrypt.compare(req.body.password, pw)
            if (!match) return { msg: "Incorrect username or password" }

            let token = await fastify.jwt.sign(req.body)
            reply.send({ token })
         } catch (err) {
            console.error(err)
            reply.code(500).send({ msg: "Internal Server Error" })
         }
      }
   )

   fastify.route({
      method: "GET",
      url: "/auth",
      preHandler: fastify.auth([fastify.authenticate]),
      handler: (req, reply) => {
         req.log.info("Auth route")
         reply.send({ hello: "world" })
      },
   })

   done()
}

module.exports = fp(routes)
