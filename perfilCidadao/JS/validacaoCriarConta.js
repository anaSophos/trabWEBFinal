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

function myFunction(e){
    const form = document.querySelector('.form')
    alert("Conta criada com sucesso!")
}

function verificarSenhas() {
    const senha = document.querySelector('input[name="senha"]').value;
    const confirmarSenha = document.querySelector('input[name="confirmarSenha"]').value;

    if (senha === confirmarSenha) {
        // Senhas correspondem, permitir avançar para outra tela
        return true;
    } else {
        // Senhas não correspondem, exibir mensagem de erro e impedir avanço
        alert('As senhas não correspondem. Por favor, verifique e tente novamente.');
        return false;
    }
    // Quando o documento estiver carregado, adicionar o evento de clique para o link "Criar Conta"
    document.addEventListener('DOMContentLoaded', function() {
        const criarContaLink = document.querySelector('.criar_Conta');

        criarContaLink.addEventListener('click', function(event) {
            if (!verificarSenhas()) {
                // Impedir o avanço se as senhas não correspondem
                event.preventDefault();
            }
        });
    });
}

