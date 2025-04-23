const express = require('express');
const app = express();

const locaisRoutes = require('./routes/locaisRoutes');
const climasRoutes = require('./routes/climasRoutes');

app.use(express.json());
app.use('/api/locais', locaisRoutes);
app.use('/api/climas', climasRoutes);

module.exports = app;
