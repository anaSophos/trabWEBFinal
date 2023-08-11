function validacaoSenha(){
    const senha = document.getElementById("senha").value
    const confirmacaoSenha = document.getElementById("confirmacaoSenha").value
    if(!senha){
        document.getElementById("buttonCriarConta").disabled = true;
        alert("Senha inválida, é obrigatório cadastrar uma senha")
    }
    else if(senha !== confirmacaoSenha){
        document.getElementById("buttonCriarConta").disabled = true;
        alert("Senhas não coincidem!")
    }
    else{
        document.getElementById("buttonCriarConta").disabled = false;
        document.getElementById("linkAcessar").href="../HTML/login.html";
    }
}

function validacaoEmail() {
    const email = document.getElementById("email").value
    if(!email){
        document.getElementById("buttonCriarConta").disabled = true;
        alert("E-mail invalido");
    }
    else if (validacao(email)){
        return true
    }
    else{
        document.getElementById("buttonCriarConta").disabled = true;
        alert("E-mail invalido");
    }
}

function validacao(email){
    return /\S+@\S+\.\S+/.test(email);
}