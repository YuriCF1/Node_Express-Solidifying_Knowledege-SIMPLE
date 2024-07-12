import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    var mensagemErro = Object.values(erro.errors) //.values = Método de iteração de objeto
      .map((erro) => erro.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagemErro}`);
  }
}

export default ErroValidacao;
