import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middleware/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/search", LivroController.buscarComplexaLivros);
routes.get("/livros/busca", LivroController.listarLivroPorAutor);
routes.get("/livros/filtro", LivroController.listrarLivroPorFiltro);
routes.get("/livros/:id", LivroController.buscaLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;
