import express from 'express';
import cors from 'cors';
import eventoRouter from './router/eventoRouter.js'; 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/eventos', eventoRouter); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
