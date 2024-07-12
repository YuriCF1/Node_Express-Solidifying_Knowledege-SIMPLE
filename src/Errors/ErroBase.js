class ErroBase extends Error {
  //Classe Error é nativa do JS
  constructor(mensagem = "Eerro interno no servidor", status = 500) {
    super();
    this.message = mensagem;
    this.status = status;
  }

  enviarRespostas(res) {
    res.status(this.status).send({
      menssagem: this.message,
      status: this.status,
    });
  }
}

export default ErroBase;
