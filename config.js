var path = require("path")
var fs = require("fs")

module.exports = {
   port: process.env.PORT || 3000,
   // check https://github.com/fastify/fastify-jwt#api-spec for details
   // this is inputed directly into fastify plugin register
   fastifyJwtConfig: {
      secret: {
         private: fs.readFileSync(
            `${path.join(__dirname, "certs")}/jwtRS256.key`,
            "utf8"
         ),
         public: fs.readFileSync(
            `${path.join(__dirname, "certs")}/jwtRS256.key.pub`,
            "utf8"
         ),
      },
      sign: { algorithm: "RS256" },
   },
}
