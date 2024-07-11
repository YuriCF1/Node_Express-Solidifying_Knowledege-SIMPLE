import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    //static = Possibilita a chamada da função sem precisar criar um classe com 'new'
    try {
      const listaAutor = await autor.find({}); //find = método mongoose. Não passei parâmetro então ele vai trazer tudo
      res.status(200).json(listaAutor);
    } catch (error) {
      res.status(500).json({ message: `Falha na requisição, erro: ${error}` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body); //Create retorna objeto criado
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao cadastrar autor - ${err.message}` });
    }
  }

  static async buscaAutorPorId(req, res) {
    try {
      const idAutor = req.params.id;
      const autorBuscado = await autor.findById(idAutor);
      res.status(201).json(autorBuscado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao buscar autor - ${err.message}` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const idAutor = req.params.id;
      await autor.findByIdAndUpdate(idAutor, req.body); //https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
      res.status(201).json({ message: "Autor atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `FALHA ao atualizar o autor - ${err.message}` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const idAutor = req.params.id;
      await autor.findByIdAndDelete(idAutor);
      res.status(200).json({ message: "Autor excluído com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA na exclusão do autor - ${err.message}` });
    }
  }
}

export default AutorController;
