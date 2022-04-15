const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require("../config/swagger");


const swaggerDocs = (app, PORT) => {

    const APIDocRoute = "/api/1.0/docs"
    app.use(APIDocRoute, swaggerUI.serve, swaggerUI.setup(swaggerOptions))
    console.log(`   ---> Swagger service run. See API documentation in http://localhost:${PORT}/api/1.0/docs`);

}

module.exports = swaggerDocs