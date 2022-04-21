# Basic Template for apps with Express Server with Mongo DB CRUD

## version 1.0

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


## Changelog

### version 1.3
Authentication, using ***JWT*** and ***BCrypt***, was implemented.  A new API was created to register and login users.  Every user has a role that is assigned during the register.  This role can be ADMIN or USER.
Authentication by roles was implemented for create new items in payments database (just an exercise), so only ADMINS can create new payments.  ADMIN and USER can see, delete and update payments.

Everytime a new user is registered, all ADMINs receive a mail with the notification.  This email is sent using ***Nodemailer*** package.

A new library was created, called ***cOut*** that  gives format to the output to the server console (*console.log*).  It uses ***Chalk*** package to add colors to every output.

***Mocha & Chai*** were used to create a basic **Unit test** on the *Payments API*.  The tests will run on a specific database created for this (*payment_test*)

### version 1.2

***JOI*** package was included for validation of data sent to API when create or update a payment

***Morgan*** package was also included as logger to the calls for the API service


### version 1.1

***Swagger*** package was used to create the documentation of the API.  It can be found on:
**http://localhost:3000/api/1.0/docs**




