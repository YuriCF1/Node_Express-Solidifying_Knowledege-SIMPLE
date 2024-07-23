import mongoose from "mongoose";

//Definindo um validador personalizado para todos os campo do tipo string
mongoose.Schema.Types.String.set("validate", {
  //Usando o set para aplicar algo em todos os campos do tipo string dos meu modelos
  validator: (valor) => {
    valor.trim() !== "";
  }, //Retorna verdadeiro ou falso
  // message: "Um campo em branco foi fornecido",
  message: (obj) => {
    console.log(obj);
    return `Um campo ${obj.path} foi fornecido em branco`; //obj.path = Campo onde foi identificado o erro
  },
});
