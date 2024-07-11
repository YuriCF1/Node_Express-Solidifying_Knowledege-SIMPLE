import express from "express";
import mongoose from "mongoose";
import connectOnDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";

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
routes(app);

app.use(manipuladorDeErros);

app.listen(8000, () => {
  console.log("Servidor na porta 8000 com o Express");
});

export default app;
