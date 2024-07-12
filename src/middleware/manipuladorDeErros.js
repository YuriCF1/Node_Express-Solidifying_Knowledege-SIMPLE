import mongoose from "mongoose";
import ErroBase from "../Errors/ErroBase.js";
import RequisicaoIncorreta from "../Errors/RequisicaoIncorreta.js";
import ErroValidacao from "../Errors/ErroValidacao.js";

export default function manipuladorDeErros(erro, req, res, next) {
  if (erro.errors) {
    // var mensagemErro = Object.values(erro.errors) //.values = Método de iteração de objeto
    //   .map((erro) => erro.message)
    //   .join("; "); //Não vi diferença colocando isso, mas é recomendado
  }

  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarRespostas(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    // res.status(400).send({
    //   message: `Os seguintes erros foram encontrados: ${mensagemErro}`,
    // });
    new ErroValidacao(erro).enviarRespostas(res);
  } else {
    new ErroBase().enviarRespostas(res);
  }
}
