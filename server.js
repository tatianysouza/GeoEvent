import express from 'express';
import cors from 'cors';
import eventoRouter from './router/eventoRouter.js'; 
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'views')));
app.use('/eventos', eventoRouter); 

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));