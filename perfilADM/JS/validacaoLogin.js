function validacaoTotal(){
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    if(!senha){
        document.getElementById("buttonAcessar").disabled = true;
        alert("Insira uma senha")
    }
    else{
        document.getElementById("buttonAcessar").disabled = false;
        document.getElementById("linkAcessar").href="../HTML/opçõesADM.html";
    }
}

function validacaoEmail() {
    const email = document.getElementById("email").value
    if(!email){
        document.getElementById("buttonAcessar").disabled = true;
        alert("E-mail invalido");
    }
    else if (validacao(email)){
        return true
    }
    else{
        document.getElementById("buttonAcessar").disabled = true;
        alert("E-mail invalido");
    }
}

function validacao(email){
    return /\S+@\S+\.\S+/.test(email);
}

function myFunction(e){
    const form = document.querySelector('.form')
    alert("Login efetuado com sucesso!")
}