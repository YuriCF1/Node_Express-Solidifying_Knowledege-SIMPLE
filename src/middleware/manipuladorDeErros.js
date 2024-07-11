import mongoose from "mongoose";

export default function manipuladorDeErros (erro, req, res, next){
    if (erro instanceof mongoose.Error.CastError) {
      res
        .status(400) //Bad request = Dado passado de forma incorreta
        .json({
          message: `Um ou mais dados fornecidos estão incorretos`,
        });
    }
    res
      .status(500)
      .json({ message: `Erro interno do servidor - ${erro.message}` });
  }