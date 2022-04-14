const paymentSchema = require("../models/payments")


const swaggerOptions = {
    openapi: "3.0.0",
    info: {
        title: "payments API",
        description: "API to handle basic CRUD operations with payments information",
        version: "1.0",
        contact: {
            name: "Darío Valenzuela",
            email: "dario.valenzuela@gmail.com"
        }
    },
    consumes: [ "application/json" ],
    produces: [ "application/json" ],
    servers: [
        {
            url: `http://localhost:3000/api/1.0`,
            description: "development server for payments info"
        }
    ],
    apis: ["../routes/payments.js"],
    components: {
        schemas: {
            Payments: {
                type: "object",
                properties: {
                    _id: { type: "String", definition: "id of the operation (automatic)" },
                    object:         { type: "String",  definition: "type of operation" },
                    description:    { type: "String", definition: "description of payment"  },
                    billed_hours:   { type: "Number", definition: "How many hours were billed to this payment" },
                    billed_at:      { type: "String", definition: "billing date" },
                    billing_currency: { type: "String", definition: "billing currency" },
                    billed_amount:  { type: "Number", definition: "amount billed in this payment" },
                    amount:         { type: "Number", definition: "amount of money in UF if billed in different currency"  },
                    currency:       { type: "String", definition: "currency in which the payment was billed"  },
                    needs_exchange: { type: "Boolean", definition: "True if currency is different from UF"  },
                    exchange_currency: { type: "String", definition: "currency if payment needs exchange"  },
                    exchange:       {
                        original_amount: { type: "Number", definition: "original amount that was billed previous to exchange operation"  },
                        currency:        { type: "String", definition: "currency in which the payment was billed"  },
                        exchange_rate:   { type: "Number", definition: "exchange rate used to convert payment to UF"  }
                    }
                },
                example: {
                    _id: "pmt_g5trr7",
                    object: "payment",
                    description: "payment for working hours",
                    billed_hours: 10.0,
                    billed_at: "2022-03-15",
                    billing_currency: "clp",
                    billed_amount: 120000,
                    amount:  3.2,
                    currency: "clp",
                    needs_exchange: true,
                    exchange_currency: "UF",
                    exchange:       {
                        original_amount: 120000,
                        currency: "clp",
                        exchange_rate: 0.332
                    }
                },
                required: [ 
                    "_id",
                    "object",
                    "billed_hours",
                    "billed_at",
                    "billing_currency",
                    "billed_amount",
                    "needs_exchange",
                    "exchange_currency"
                ]
            },
            postPayment: {
                type: "object",
                properties: {
                    description: { type: "String", definition: "description of payment"  },
                    billed_hours:  { type: "Number", definition: "How many hours were billed to this payment" },
                    billed_at:      { type: "String", definition: "billing date" },
                    billing_currency: { type: "String", definition: "billing currency" },
                    billed_amount:  { type: "Number", definition: "amount billed in this payment" },
                    needs_exchange: { type: "Boolean", definition: "True if currency is different from UF"  },
                    exchange_currency: { type: "String", definition: "currency if payment needs exchange"  }
                },
                example: {
                    description:  "New Payment",
                    billed_hours: 2.0,
                    billed_at:    "2020-04-01",
                    billing_currency: "clp",
                    billed_amount:  100000,
                    needs_exchange: true,
                    exchange_currency: "UF"
                },
                required: [
                    "description",
                    "billed_hours",
                    "billed_at",
                    "billing_currency",
                    "billed_amount",
                    "needs_exchange",
                    "exchange_currency"
                ]
            }
        }
    },

    paths: {
        "/payments": {
            "post": {
                tags: ["payments"],
                summary: "creates a new payment item",
                requestBody: {
                    description: "json with the payment information",
                    content: {
                        "application/json" : {
                            schema: {
                                $ref: '#components/schemas/postPayment'
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    201: {
                        description: "succesful operation, list payment created",
                        content: {
                            "application/json" : {
                                schema: {
                                    $ref: "#components/schemas/Payments"
                                }
                            }
                        }
                    },
                    404: {
                        description: "resource not found"
                    }
                }
            },
            "get": {
                tags: ["payments"],
                summary: "list all payments in the database",
                parameters: [{
                    name: "description",
                    in: "path",
                    description: "id of the required payment",
                    required: true,
                    type: "String"
                }],
                responses: {
                    200: {
                        description: "succesful operation, list of all payments created",
                        content: {
                            "application/json" : {
                                schema: {
                                    $ref: "#components/schemas/Payments"
                                }
                            }
                        }
                    },
                    404: {
                        description: "resource not found"
                    }
                }
            }
        },
        "/payments/{id}": {
            "get": {
                tags: ["payments"],
                summary: "list one specific payments in the database by its id",
                parameters: [{
                    name: "id",
                    in: "path",
                    description: "id of the required payment",
                    required: true,
                    type: "String"
                }],
                responses: {
                    200: {
                        description: "succesful operation, list the requested payment",
                        content: {
                            "application/json" : {
                                schema: {
                                    $ref: "#components/schemas/Payments"
                                }
                            }
                        }
                    },
                    404: {
                        description: "resource not found"
                    }
                }
            },
            "delete": {
                tags: ["payments"],
                summary: "delete one specific payments in the database by its id",
                parameters: [{
                    name: "id",
                    in: "path",
                    description: "id of the required payment",
                    required: true,
                    type: "String"
                }],
                responses: {
                    202: {
                        description: "payment succesfully deleted",
                    },
                    404: {
                        description: "resource not found"
                    }
                }
            },
            "put": {
                tags: ["payments"],
                summary: "edit one specific payments in the database by its id",
                requestBody: {
                    description: "json with the payment information to be updated",
                    content: {
                        "application/json" : {
                            schema: {
                                $ref: '#components/schemas/postPayment'
                            }
                        }
                    },
                    required: true
                },
                parameters: [{
                    name: "id",
                    in: "path",
                    description: "id of the required payment",
                    required: true,
                    type: "String"
                }],
                responses: {
                    202: {
                        description: "payment succesfully updated",
                    },
                    404: {
                        description: "resource not found"
                    }
                }
            }
        }
    }
}



module.exports = swaggerOptions