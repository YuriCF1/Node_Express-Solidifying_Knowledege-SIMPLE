import RequisicaoIncorreta from "../Errors/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    console.log('PAGINANDO');
  try {
    console.log(req.query);
    let {
      limite = 1,
      pagina = 1, //PAGINAÇÃO
      // campoOrdenacao = "_id",
      // ordem = -1,
      ordenacao = "_id:-1",
    } = req.query;
    // throw new Error();
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .find({}) //find = método mongoose. Não passei parâmetro então ele vai trazer tudo
        // .sort({ _id: -1 }) //_id -> Campo que quero ordernar | -1 -> de forma decrescente, ou seja os adicionados mais recentes
        .sort({ [campoOrdenacao]: ordem }) //titulo -> Campo que quero ordernar | - -> de forma crescente, neste caso em ordem alfabética
        .skip((pagina - 1) * limite) //Se tiver na pagina 1 -> 1-1 = 0 * 1 = 0 -> Não vai pular livro nenhum
        .limit(limite);
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta("Dados de paginação incorretos"));
    }
  } catch (error) {
    next(error);
  }
}

export default paginar;
