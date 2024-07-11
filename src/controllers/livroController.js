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

      if (req.body.autor) {
        var autorAtualizado = await autor.findById(req.body.autor);
        console.log(autorAtualizado);
        if (!autorAtualizado) {
          return res.status(404).json({ message: "Autor não encontrado" });
        }
      }

      const update = {};
      if (req.body.titulo) {
        update.titulo = req.body.titulo;
      }
      if (req.body.editora) {
        update.editora = req.body.editora;
      }
      if (req.body.preco) {
        update.preco = parseFloat(req.body.preco);
      }
      if (req.body.paginas) {
        update.paginas = parseInt(req.body.paginas);
      }
      if (req.body.autor) {
        update.autor = autorAtualizado;
      }

      const livroAtualizado = await livro.findByIdAndUpdate(idLivro, update, {
        new: true,
      });
      if (!livroAtualizado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      res
        .status(200)
        .json({ message: "Livro atualizado", livro: livroAtualizado });
    } catch (err) {
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

  static async listarLivroPorAutor(req, res) {
    const nomeAutor = req.query.autor;
    try {
      const livrosPorAutor = await livro.find({ "autor.nome": nomeAutor });
      res.status(200).json(livrosPorAutor);
    } catch (err) {
      console.error("Erro ao buscar livro:", err);
      res
        .status(500)
        .json({ message: `FALHA ao buscar livro - ${err.message}` });
    }
  }

  static async buscarComplexaLivros(req, res) {
    const { titulo, autor, editora, precoMaximo } = req.query;

    let query = {};

    if (titulo) {
      query.titulo = { $regex: titulo, $options: "i" }; // Busca case-insensitive por título
    }

    if (autor) {
      query["autor.nome"] = { $regex: autor, $options: "i" }; // Busca case-insensitive por nome do autor
    }

    if (editora) {
      query.editora = { $regex: editora, $options: "i" }; // Busca case-insensitive por editora
    }

    if (precoMaximo) {
      query["preco"] = { $lte: parseFloat(precoMaximo) }; // Busca por livros com preço menor ou igual ao preço máximo
    }

    try {
      const livrosEncontrados = await livro.find(query);
      res.status(200).json(livrosEncontrados);
    } catch (err) {
      res
        .status(500)
        .json({ message: `FALHA ao buscar livros - ${err.message}` });
    }
  }
}

export default LivroController;
