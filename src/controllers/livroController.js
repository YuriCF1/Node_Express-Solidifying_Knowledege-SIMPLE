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
    try {
      const novoLivro = await livro.create(req.body); //Create retorna objeto criado
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: novoLivro });
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao cadastrar livro - ${err.message}` });
    }
  }
}

export default LivroController;
