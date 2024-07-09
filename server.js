import http from "http";

const PORT = 8000;

const rotas = {
  "/": "Curso de API usando Node.js",
  "/livros": "Entrei na rota Livros",
  "/autores": "Entrei na rota Autores",
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "text/plain" });
  res.end(rotas[req.url]);
});

server.listen(PORT, () => {
  console.log("Servidor na porta 8000");
});
