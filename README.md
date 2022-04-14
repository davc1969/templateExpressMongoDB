# Basic Template for apps with Express Server with Mongo DB CRUD

This templates is only for the creation of the CRUD of a simple schema (payments) for a Mongo database.  
Connection to dataabse is by *mongoose* package.

the route for the API is
**/api/1.0/payments**, and the options are:

* /api/1.0/payments: ***POST*** to create a payment, the body must contains the following info as json:
{
    "description": "Pago",
    "billed_hours": 2.5,
    "billed_at": "2020-04-01",
    "billing_currency": "clf",
    "billed_amount": 1.6,
    "needs_exchange": false,
    "exchange_currency": "clp"
}

* /api/1.0/payments: ***GET*** to show all the payments 

* /api/1.0/payments/_id: ***GET*** to show an specific payment by its id

* /api/1.0/payments/_id: ***PUT*** to update a payment, the body must contains the following info as json:
{
    "description": "Pago redoble",
    "billed_hours": 2.6,
    "billed_at": "2020-04-01",
    "billing_currency": "clf",
    "billed_amount": 1.6,
    "needs_exchange": true,
    "exchange_currency": "clp"
}

* /api/1.0/payments/_id: ***DELETE*** to delete an specific payment by its id

the file *api.rest* shows the example for the use of the CRUD.  This file works in VSC with the extension *REST Client*.

Additions to this template will come soon, things like data validation, unitary tests, handlebars views will be added.