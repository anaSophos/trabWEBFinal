function validarForm(){
    const nome = document.getElementById("nome").value
    const cpf = document.getElementById("cpf").value
    const rg = document.getElementById("RG").value
    const nascimento = document.getElementById("nascimento").value
    if(!nome){
        document.getElementById("buttonAgendar").disabled = true;
        alert("Insira seu Nome completo")
    }
    else if (cpf.length !== 11) {
        document.getElementById("buttonAgendar").disabled = true;
        alert("CPF inválido")
    }            
    // Verifica se todos os dígitos são iguais, o que é um CPF inválido
    else if (/^(\d)\1+$/.test(cpf)) {
        document.getElementById("buttonAgendar").disabled = true;
        alert("CPF inválido")
    }
    else if (rg.length !== 7){
        document.getElementById("buttonAgendar").disabled = true;
        alert("RG inválido")
    }
    else if(!nascimento){
        document.getElementById("buttonAgendar").disabled = true;
        alert("Insira sua Data de nascimento")
    }
    else{
        document.getElementById("buttonAgendar").disabled = false; 
        document.getElementById("linkAcessar").href="../HTML/confirmacao_agendamento.html";
    }
}