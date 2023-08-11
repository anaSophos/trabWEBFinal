const vacinas = [
  /**ID   ,  NAME   ,    QTDTOTAL     , QTDAGENDAMENTO*/
  [1, "Covid-19", 1, 0],
  [2, "Hepatite", 0, 0],
  [3, "Febre Amarela", 0, 0],
]

function minhaFuncao(id) {
  return "Valor da função para o ID: " + id;
}

var elementoId = document.getElementById("1");
var id = parseInt(elementoId)
id.textContent = minhaFuncao(id)

function retornarQtdVac(id){
  var inId = parseInt(id)
  var elemento = vacinas[inId-1][2]
  return elemento
}

function diminuirQtdVacina(quant, element){

  /** 
  var classValue = parseInt(element.parentElement.querySelector('.number').value);
  classValue+=quant;
  //console.log(classValue); 
  if(classValue < 1){
      element.parentElement.querySelector("input.quanti").value = 1;
  }else{ 
      element.parentElement.querySelector("input.quanti").value = classValue;    
  }*/
}