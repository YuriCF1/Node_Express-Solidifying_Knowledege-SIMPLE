import NaoEncontrado from "../Errors/NaoEncontrado.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";
class LivroController {
  static async listarLivros(req, res, next) {
    //static = Possibilita a chamada da função sem precisar criar um classe com 'new'
    try {
      // throw new Error();
      const listaLivros = await livro.find({}); //find = método mongoose. Não passei parâmetro então ele vai trazer tudo
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
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
    } catch (error) {
      next(error);
    }
  }

  static async buscaLivroPorId(req, res, next) {
    try {
      const idLivro = req.params.id;
      const livroBuscado = await livro.findById(idLivro);
      if (livroBuscado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const idLivro = req.params.id;

      if (req.body.autor) {
        var autorAtualizado = await autor.findById(req.body.autor);
        if (!autorAtualizado) {
          next(new NaoEncontrado("Autor não encontrado"));
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
        next(new NaoEncontrado("Livro não encontrado"));
      }

      res
        .status(200)
        .json({ message: "Livro atualizado", livro: livroAtualizado });
    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const idLivro = req.params.id;
      await livro.findByIdAndDelete(idLivro);
      res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorAutor(req, res, next) {
    const nomeAutor = req.query.autor;
    try {
      const livrosPorAutor = await livro.find({ "autor.nome": nomeAutor });
      res.status(200).json(livrosPorAutor);
    } catch (error) {
      next(error);
    }
  }

  static async listrarLivroPorFiltro(req, res, next) {
    const { titulo, autor, editora, minPaginas, maxPaginas } = req.query;
    const regexTitulo = new RegExp(titulo, "i"); //i = Case insensitive

    const busca = {};

    if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //Dessa forma, utiliza operadores do mongoose. Mas também posso passar o regexTitulo
    if (autor) busca["autor.nome"] = autor;
    if (editora) busca.editora = editora;
    if (minPaginas) busca.paginas = { ...busca.paginas, $gte: minPaginas };
    if (maxPaginas) busca.paginas = { ...busca.paginas, $lte: maxPaginas };

    try {
      // const livrosPorAutor = await livro.find({
      //   "autor.nome": autor,
      //   titulo: titulo,
      // });

      console.log(busca);
      const livrosPorAutor = await livro.find(busca);
      res.status(200).json(livrosPorAutor);
    } catch (error) {
      next(error);
    }
  }

  static async buscarComplexaLivros(req, res, next) {
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
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;
