import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Evento = sequelize.define('evento', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    publico_alvo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    localizacao: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
    }
});

Evento.sync();

export default Evento;
