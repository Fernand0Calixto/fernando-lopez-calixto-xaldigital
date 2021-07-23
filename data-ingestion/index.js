const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('pg');

// connection configuration
const postgresClient = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const readCSVFile = (fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  })
}

const insertClient = async(fileName) => {
  // connect to postgres
  await postgresClient.connect();

  // read csv
  const clients = await readCSVFile(fileName);

   // insert clients
   for (let client of clients) {

    const regularExpresion = /^[A-Z]+$/;
    const result = client.state.match(regularExpresion);

    if(result && client.state.length == 2)
      await postgresClient.query(`
        insert into client 
        values (
        '${client.email}',
        '${client.first_name}',
        '${client.last_name}',
        '${client.company_name}',
        '${client.address}',
        '${client.city}',
        '${client.state}',
        ${client.zip},
        '${client.phone1}',
        '${client.phone2}',
        '${client.department}')
      `);
    }
  
  // close connection
  await postgresClient.end();
}


insertClient('dataset.csv').catch(console.log);