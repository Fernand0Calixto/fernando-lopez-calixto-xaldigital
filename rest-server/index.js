const express = require('express');
const app = express();
const { Client } = require('pg');

// connection configuration
const postgresClient = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// connect to postgres
postgresClient.connect();

// parsing application/json
app.use(express.json());

// get all clients
app.get('/clients', async (req, res) => {
  const clients = await postgresClient.query('SELECT * FROM client');
  res.json({
    message: 'Success',
    clients: clients.rows
  });
})

// create client
app.post('/clients', async (req, res) => {
  
  const body = req.body;

  const regularExpresion = /^[A-Z]+$/;

  // validate fields and types
  if(body.email && typeof(body.email) == 'string' &&
     body.first_name && typeof(body.first_name) == 'string' &&
     body.last_name && typeof(body.last_name) == 'string' &&
     body.company_name && typeof(body.company_name) == 'string' && 
     body.address && typeof(body.address) == 'string' &&
     body.city && typeof(body.city) == 'string' &&
     body.state && typeof(body.state) == 'string' && body.state.length == 2 && body.state.match(regularExpresion) &&
     body.zip && typeof(body.zip) == 'number' &&
     body.phone2 && typeof(body.phone2) == 'string' &&
     body.department && typeof(body.department) == 'string') {
      
    // insert client
    await postgresClient.query(`
      insert into client 
      values (
      '${body.email}',
      '${body.first_name}',
      '${body.last_name}',
      '${body.company_name}',
      '${body.address}',
      '${body.city}',
      '${body.state}',
      ${body.zip},
      '${body.phone1}',
      '${body.phone2}',
      '${body.department}')
    `);
      
    res.json({
      message: 'Success'
    });

  } else {
    res.status(400).json({
      message: 'Invalid request'
    });
  }
  
})

app.listen(3000);