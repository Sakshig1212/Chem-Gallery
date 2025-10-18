const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');

require('./models/compound.model');
require('./models/user.model');

const compoundRoutes = require('./routes/compound.routes');
const authRoutes = require('./routes/auth.routes'); // We will use this file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/compounds', compoundRoutes);

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Welcome to the Chemical Compounds API!');
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to sync database:', err);
  });