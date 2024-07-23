import mongoose from "mongoose";
import { autorSchema } from "../models/Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    //   titulo: { type: mongoose.Schema.Types.String },
    titulo: { type: String, required: [true, "O nome do livro é obrigatório"] },
    editora: {
      type: String,
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora '{VALUE}' não é permitido.", //Personalizando a mensagem de erro. O mongoose entende o {VALUE} como o valor que foi enviado.
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      min: [
        10,
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
      ],
      max: [
        5000,
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}",
      ],
    },
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
