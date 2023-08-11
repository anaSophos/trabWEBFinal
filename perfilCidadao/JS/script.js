let vacinas = [
    {id: 1,nome: "Febre Amarela",fila: 1,vagas: 9,hora: "08:00",local: "Posto de Saude Rinatinha"}, //mudar os dados dps
    {id: 2,nome: "Gripe",fila: 1,vagas: 9,hora: "07:00",local: "Posto de Saude Maria das Graças"},
    {id: 3,nome: "Hepatite B ",fila: 2,vagas: 8,hora: "11:00",local: "Posto de Saúde Jose Manoel da Anunciacao"},
    {id: 4,nome: "Covid 19",fila: 3,vagas: 7,hora: "10:00",local: "Posto de Saude Pedro Calvacante"},
    {id: 5,nome: "Hepatite A",fila: 4,vagas: 6,hora: "11:30",local: "Posto de Saude Santa Fé"},
    {id: 6,nome: "Varicela",fila: 3,vagas: 7,hora: "15:00",local: "Posto de Saude Espirito Santo"},
    {id: 7,nome: "Tetraviral",fila: 1,vagas: 9,hora: "16:00",local: "Posto de Saude Enf. Zezinha"},
    {id: 8,nome: "Anti dor de barriga",fila: 1,vagas: 9,hora: "9:40",local: "Posto de Saude Rinatinha"}
]


function idlocalstorage(e, id){ //id da vacina que foi clicada
        e.preventDefault() //previne que o "a" faça reload na pagina
        const referencia = "../HTML/criar.html" //href que vai ser inserido
        localStorage.setItem("idvacina", id) //armazena o id da vacina clicada no localstorage, na variavel "idvacina"
        setTimeout(() => {
            window.location.href=referencia
        }, 50); //depois de armazenar id, 50ms pra refresh na pagina
    }

function buscaVacinas(){
    vacinas.map((item)=> { //loop por todas as vacinas da lista

        //buscando propriedades da vacina em evidencia
        let id = item.id
        let nome = item.nome
        let fila = item.fila
        let vagas = item.vagas
        let hora = item.hora
        let local = item.local
    
        //criando string que simula elemento html, com dados de forma dinamica
        const elementotxt = `
        <div class="card">
                <figure>
                    <img src="../assets/syringe.png" alt="">
                    <span>${nome}</span>
                    <span class="fila">${fila} pessoas na fila</span>
                </figure>
        
                <div class="card-infos">
                    <p>${vagas} vagas disponiveis</p>
                    <p>Horário: ${hora} horas</p>
                    <p>${local}</p>
                </div>
        
                <a class="containerIdLocal" onclick="idlocalstorage(event, ${id})" href="#"><span>AGENDAR VACINA</span></a>
            </div>
        `
    
        const parser = new DOMParser() //cria elemento do DOM
        const elementodocument = parser.parseFromString(elementotxt, "text/html") //insere a string dentro do DOM, interpretando como elemento html
        const elemento = elementodocument.body.firstChild //o dom cria um documento completo (com head, body, etc)
                                                          //A unica coisa interessante é o primeiro filho do body desse doc
                                                          //(a div do card)
    
        const container = document.querySelector(".cards-container") //acha o elemento que vai ser inserido
        container.insertBefore(elemento, container.lastChild) //insere o item dentro da div container
    })
}

//criar.html
function confirmarAgendamento(e){
    e.preventDefault()//previne que o "a" faça reload na pagina

    let agendamentos //define variavel vazia para agendamentos encontrados
    
    function checaListaAgendamentos(){
        if(localStorage.getItem("agendamentos")){ //Checa pra ver se ja tem agendamentos no localstorage
            agendamentos=JSON.parse(localStorage.getItem("agendamentos")) //se ja tiverem, a lista encontrada é colocada na variavel agendamentos
                                                                          //OBS: JSON.parse converte string em elemento (nesse caso uma lista)
        }else{
            localStorage.setItem("agendamentos", JSON.stringify([])) //se nao tiverem agendamentos, ele cria uma lista vazia de agendamentos no localstorage
            checaListaAgendamentos() //e roda a funcao de novo, agora vai cair no if, já que vai ter uma lista de agendamentos criada
        }
    }
    checaListaAgendamentos() //rodando a funcao


    //busca a vacina com o mesmo id que o id localizado no localstorage(vacina referenciada no clique do botao que contem funcao "idlocalstorage") 
    const vacinagendada = vacinas.filter((element)=>element.id === parseInt(localStorage.getItem("idvacina")))

    //por hora, nao foi achado agendamento com vacina com msm id da vacina referenciada acima
    let agendamentoRepetido = false

    //busca na lista de agendamentos
    for(agendamento of agendamentos){
        //algum agendamento que possua msm id que a vacina referenciada acima
        if(agendamento.id === vacinagendada[0].id){ //se achar (agendamento vai ser repetido)
            agendamentoRepetido=true//transforma condicao em true
            break
        }
    }

    if(agendamentoRepetido){ //se o agendamento que ele esta tentando fazer já constar
        Swal.fire({ //mostra que nao é possivel agendar
            title:"Agendamento já existente",
            text: "Você já está agendado(a) nessa vacina",
            icon:"error",
            showConfirmButton: true,
            confirmButtonText: "Voltar ao início",
            allowOutsideClick:false
        }).then((result)=>{
            if(result.isConfirmed){
                window.location.href = "../HTML/index.html" //redireciona
            }
        })
    }else{ //se nao achar nenhum agendamento repetido
        Swal.fire({//ele permite que agende
            title:"Deseja confirmar o agendamento?",
            text: "Essa ação poderá ser desfeita futuramente",
            icon:"question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sim",
            confirmButtonColor: "#3085d6",
            cancelButtonText: "Não",
            cancelButtonColor: "#d33",
            reverseButtons:true
        }).then((result)=>{
            if(result.isConfirmed){ //quando apertar em "Sim"
                agendamentos.push(vacinagendada[0]) //adiciona a vacina na lista de agendamentos
                //Atualiza o localstorage com a nova lista(mutada) de agendamentos
                localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
                Swal.fire({
                    title:"Vacina agendada com sucesso!",
                    icon:"success",
                    showConfirmButton:true,
                    showDenyButton:true,
                    confirmButtonText:"Voltar ao menu",
                    denyButtonText: "Ver meus agendamentos",
                    denyButtonColor: "#3085d6",
                    allowOutsideClick:false
                }).then((result)=>{
                    if(result.isConfirmed){
                        window.location.href = "../HTML/index.html" //redirect voltar menu
                    }else if(result.isDenied){
                        window.location.href = "../HTML/meusAgendamentos.html" //redirect meus agendamentos
                    }
                })
            }
        })
    }
}


function cancelarAgendamento(id){ //quando clicado botao cancelar agendamento
                                  //o id é recebido como parametro no "a" que está vinculada a funcao

    //busca a lista de agendamentos, e converte de string pra lista
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos"))
    for(agendamento of agendamentos){ //loop entre elementos da lista de agendamentos
        if(agendamento.id === id){ //busca o agendamento que possui mesmo id que o parametro
            agendamentos.shift(agendamento) //se achar, ele retira o agendamento da lista
            break
        }
    }

    Swal.fire({
        title:"Deseja cancelar o agendamento?",
        icon:"warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Sim",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Não",
        cancelButtonColor: "#d33",
        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){ //quando confirmado
            //atualiza a lista de agendamentos no localstorage (convertido em string)
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos))

            Swal.fire({
                title:"Agendamento cancelado com sucesso!",
                icon:"success",
                showConfirmButton:true,
                confirmButtonText:"Ok",
                allowOutsideClick:false
            }).then((result)=>{
                if(result.isConfirmed){ //quando confirmado, reload na tela pra atualizar os cards a mostra
                    location.reload()
                }
            })
        }
    }) 
}



//meus agendamentos
function carregaAgendamentos(){
    
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) //busca lista de agendamentos no localstorage

    if(agendamentos!==null && agendamentos.length!==0){ //se forem encontrados agendamentos
        document.querySelector(".agendamentos-notFound").style.display="none" //a div escrita que nao ha agendamentos desaparece
    }else if(agendamentos === null || agendamentos.length===0){ //se nao forem encontrados agendamentos
        document.querySelector(".agendamentos-notFound").style.display="block" //a div reaparece
        return 0
    }

    agendamentos.map((item)=> {//loop por todas as vacinas da lista

        //buscando propriedades da vacina em evidencia
        let id = item.id
        let nome = item.nome
        let fila = item.fila
        let vagas = item.vagas
        let hora = item.hora
        let local = item.local
    
        //criando string que simula elemento html, com dados de forma dinamica
        const elementotxt = `
            <div class="cards-container">
                <figure class="people-row">
                    <img src="../assets/pessoas_em_fila.jpg" alt="">
                </figure>
                <h2>0${fila+1}º</h2>
                <h3>Pessoa na fila</h3>
                <div class="descricoes">
                    <div class="description">
                        <figure>
                            <img src="../assets/syringe.png">
                        </figure>
                        <p>Vacina: ${nome}</p>
                    </div>
                    <div class="description">
                        <figure>
                            <img src="../assets/icone_map.jpg">
                        </figure>
                        <p>Posto de saúde: ${local}</p>
                    </div>
                    <div class="description">
                        <figure>
                            <img src="../assets/clock.jpg">
                        </figure>
                        <p>Horário estimado: ${hora} horas (BR)</p>
                    </div>
                    <a onclick="cancelarAgendamento(${id})" href="#"><span>CANCELAR AGENDAMENTO</span></a>
                </div>
            </div>
        `

        const parser = new DOMParser() //cria elemento do DOM
        const elementodocument = parser.parseFromString(elementotxt, "text/html") //insere a string dentro do DOM, interpretando como elemento html
        const elemento = elementodocument.body.firstChild   //o dom cria um documento completo (com head, body, etc)
                                                            //A unica coisa interessante é o primeiro filho do body desse doc
                                                            //(a div do card)
    
        const container = document.querySelector("main") //acha o elemento que vai ser inserido
        container.insertBefore(elemento, container.lastChild) //insere o item dentro da div container
    })    
}