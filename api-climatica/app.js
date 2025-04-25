const express = require('express');
const app = express();
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  );
}

// Importação das rotas
const locaisRoutes = require('./routes/locaisRoutes');
const climasRoutes = require('./routes/climasRoutes');

// Middlewares
app.use(express.json());

// Uso das rotas
app.use('/api/locais', locaisRoutes);
app.use('/api/temperatura', climasRoutes);

module.exports = app;
