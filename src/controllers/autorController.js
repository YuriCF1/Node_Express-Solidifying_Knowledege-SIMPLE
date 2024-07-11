import mongoose from "mongoose";
import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    //static = Possibilita a chamada da função sem precisar criar um classe com 'new'
    try {
      const listaAutor = await autor.find({}); //find = método mongoose. Não passei parâmetro então ele vai trazer tudo
      res.status(200).json(listaAutor);
    } catch (error) {
      next(err)
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body); //Create retorna objeto criado
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
    } catch (err) {
      next(err)
    }
  }

  static async buscaAutorPorId(req, res, next) {
    try {
      const idAutor = req.params.id;
      const autorBuscado = await autor.findById(idAutor);
      if (autorBuscado) {
        res.status(201).json(autorBuscado);
      } else {
        res.status(404).json({ message: `Autor não encontrado` });
      }
    } catch (err) {
      next(err)
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const idAutor = req.params.id;
      await autor.findByIdAndUpdate(idAutor, req.body); //https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
      res.status(201).json({ message: "Autor atualizado" });
    } catch (error) {
      next(err)
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const idAutor = req.params.id;
      await autor.findByIdAndDelete(idAutor);
      res.status(200).json({ message: "Autor excluído com sucesso!" });
    } catch (err) {
      next(err)
    }
  }
}

export default AutorController;
