import express from "express";
import connectOnDatabase from "./config/dbConnect.js";

const conexao = await connectOnDatabase();

conexao.on("error", (erro) => {
  //https://mongoosejs.com/docs/connections.html#connection-events = Eventos possíveis do Mongoose
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  //O método once é semelhante ao on, mas ele registra um único ouvinte para o evento.
  // Isso significa que o callback será executado apenas uma vez quando o evento ocorrer.
  // Por exemplo, para ouvir quando a conexão com o MongoDB estiver pronta, você pode usar o once:
  console.log("Conexão com o banco realizada");
});

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
  },
  {
    id: 2,
    titulo: "O Hobbit",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.get("/livros/:id", (req, res) => {
  const { id } = req.params;
  const index = buscaLivros(id);
  res.status(200).json(livros[index]);
});

function buscaLivros(id) {
  return livros.findIndex((liv) => {
    return liv.id === +id;
  });
}

app.put("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json({ msg: "Livro atualizado com sucesso!", livros });
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivros(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso!"); //204 não retorna nenhuma mensagem
});

app.listen(8000, () => {
  console.log("Servidor na porta 8000 com o Express");
});

export default app;
