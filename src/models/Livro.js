import mongoose from "mongoose";
import { autorSchema } from "../models/Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    //   titulo: { type: mongoose.Schema.Types.String },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema,
  },
  { versionKey: "_version1" }
);

const livro = mongoose.model("livros", livroSchema); //Criando um modelo. Criando uma coleção chamada 'livros', e quais são as proprieades desses livros = 'livroSchema

export default livro;

/*
NOTAS:

Modelo é um objeto que representa uma coleção em um Database.
Modelo em si é uma interface para que a API interaja com os documentos de uma coleção
Modeo é o que fornece para a API todos os métodos que dá para fazer, no CRUD.
*/
