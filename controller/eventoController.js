import Evento from "../model/evento.js";

// listarr
export async function listarEventos(req, res) {
    try {
        const eventos = await Evento.findAll();
        res.json(eventos);
    } 
    catch (err) {
        res.status(500).send("Erro ao listar os eventos");
    }
}

// criar
export async function criarEvento(req, res) {
    try {
        const evento = await Evento.create(req.body);
        res.json(evento);
    } 
    catch (err) {
        res.status(400).send("Erro ao criar o evento");
    }
}

//buscar por id
export async function buscarEventoPorId(req, res) {
    try {
        const evento = await Evento.findByPk(req.params.id);
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } 
        res.json(evento);
    } 
    catch (err) {
        res.status(500).send("Erro ao buscar evento");
    }
}

//atualizar
export async function atualizarEvento(req, res) {
    try {
        const evento = await Evento.findByPk(req.params.id);
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } 
        evento.set(req.body);
        await evento.save();
        res.json(evento);
    } 
    catch (err) {
        res.status(400).send("Erro ao atualizar evento");
    }
}

//deletar
export async function deletarEvento(req, res) {
    try {
        const evento = await Evento.findByPk(req.params.id);
        if (!evento) {
            res.status(404).send("Evento não encontrado");
        } 
        await evento.destroy();
        res.json(evento);
    } 
    catch (err) {
        res.status(500).send("Erro ao deletar evento");
    }
}
