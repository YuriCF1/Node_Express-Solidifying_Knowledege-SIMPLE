import express from "express";
import mongoose from "mongoose";
import connectOnDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";
import manipulador404 from "./middleware/manipulador404.js";

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
// app.use((req, res) => {
//   res.status(200).send({ mensagem: "Resposta do novo middleware" }); 1-//Caso um 'send' seja enviado. O fluxo para nele. Afinal, apenas uma resposta pode ser enviada para cada requisição.
// });

// app.use((req, res, next) => {
//   console.log("Código de um novo middleware"); 2-//Para isso serve o next, para que ele consiga fazer alguma lógica, sem para o fluxo
//   next();
// });

// app.get("/livros", (req, res, next) => {
//   console.log("Middleware registrado no GET da rota /livros"); 3-//Exemplo de implementação de middleware para uma rota específica
//   next();
// });

routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

app.listen(8000, () => {
  console.log("Servidor na porta 8000 com o Express");
});

export default app;
