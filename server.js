import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

const app = express();
app.use(cors());
app.use(express.json());
sequelize.authenticate();

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
