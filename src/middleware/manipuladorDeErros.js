import mongoose from "mongoose";

export default function manipuladorDeErros(erro, req, res, next) {
  const mensagemErro = Object.values(erro.errors) //.values = Método de iteração de objeto
    .map((erro) => erro.message);
  if (erro instanceof mongoose.Error.CastError) {
    res
      .status(400) //Bad request = Dado passado de forma incorreta
      .json({
        message: `Um ou mais dados fornecidos estão incorretos`,
      });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    console.log("VALIDATION", erro.errors);
    res.status(400).send({
      message: `Os seguintes erros foram encontrados: ${mensagemErro}`,
    });
  }
  res
    .status(500)
    .json({ message: `Erro interno do servidor - ${erro.message}` });
}
