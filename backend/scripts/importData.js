// scripts/importData.js

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Compound = require('../models/compound.model');
const sequelize = require('../config/database');

const csvFilePath = path.join(__dirname, '../compound.csv');
const results = [];

console.log('Starting data import process...');

fs.createReadStream(csvFilePath)
  .pipe(csv({
    mapHeaders: ({ header }) => {
      switch (header) {
        case 'CompoundName':
          return 'name';
        case 'CompounrDescription':
          return 'description';
        case 'strImageSource':
          return 'image';
        default:
          return null;
      }
    }
  }))
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    console.log(`CSV file read successfully. Found ${results.length} records.`);

    if (results.length === 0) {
      console.error("Error: No data was found in the CSV file.");
      return;
    }

    try {
      console.log('Connecting to database and synchronizing table...');
      
      await sequelize.sync({ force: true });
      console.log('Database synchronized. `compounds` table created.');
      
      await Compound.bulkCreate(results);
      console.log(`${results.length} records have been successfully imported!`);
      
    } catch (error) {
      console.error('AN ERROR OCCURRED DURING IMPORT:', error);
    } finally {
      await sequelize.close();
      console.log('Database connection closed.');
    }
  });