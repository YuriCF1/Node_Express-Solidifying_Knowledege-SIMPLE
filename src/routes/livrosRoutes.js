import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middleware/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar); //Exemplo de uso de paginação
/*RESUMO
    Controller - Salvar a pesquisar inicial em uma nova propriedade adicionada em req, enviar ela pelo next.
    Então o middleware de paginar vai conseguir fazer a lógica sozinho
*/
routes.get("/livros/search", LivroController.buscarComplexaLivros);
routes.get("/livros/busca", LivroController.listarLivroPorAutor);
routes.get("/livros/filtro", LivroController.listrarLivroPorFiltro);
routes.get("/livros/:id", LivroController.buscaLivroPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes;
