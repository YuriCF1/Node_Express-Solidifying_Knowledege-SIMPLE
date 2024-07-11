import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res) {
    //static = Possibilita a chamada da função sem precisar criar um classe com 'new'
    try {
      const listaLivros = await livro.find({}); //find = método mongoose. Não passei parâmetro então ele vai trazer tudo
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).json({ message: `Falha na requisição, erro: ${error}` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    let autorEncontrado = null;
    try {
      if (novoLivro.autor) {
        autorEncontrado = await autor.findById(novoLivro.autor);
      }
      const livroCompleto = {
        ...novoLivro,
        // autor: { ...autorEncontrado._doc }, //Recomendado, mas não vi diferença
        autor: { ...autorEncontrado },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: livroCriado });
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao cadastrar livro - ${err.message}` });
    }
  }

  static async buscaLivroPorId(req, res) {
    try {
      const idLivro = req.params.id;
      const livroBuscado = await livro.findById(idLivro);
      res.status(201).json(livroBuscado);
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao buscar livro - ${err.message}` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const idLivro = req.params.id;
      await livro.findByIdAndUpdate(idLivro, req.body); //https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
      res.status(201).json({ message: "Livro atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `FALHA ao atualizar o livro - ${err.message}` });
    }
  }

  static async excluirLivro(req, res) {
    try {
      const idLivro = req.params.id;
      await livro.findByIdAndDelete(idLivro);
      res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA na exclusão do livro - ${err.message}` });
    }
  }
}

export default LivroController;
