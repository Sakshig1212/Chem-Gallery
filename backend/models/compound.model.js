// models/compound.model.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compound = sequelize.define('Compound', {


  id: {
    type: DataTypes.INTEGER,    
    autoIncrement: true,        
    primaryKey: true            
  },
  name: {
    type: DataTypes.STRING,     
    allowNull: false            
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,       
    allowNull: true           
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false 
  }
}, {
 

  tableName: 'compounds',      
  timestamps: false            
});
module.exports = Compound;