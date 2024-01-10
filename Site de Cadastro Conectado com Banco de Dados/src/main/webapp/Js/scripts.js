const UrlCriacao = "http://localhost:8080/desafio05/cadastro/criar"
const UrlLista = "http://localhost:8080/desafio05/cadastro/get"
const UrlEdicao = "http://localhost:8080/desafio05/cadastro/edit"

let listaJson = [];


const fetchApiCriacao = async (pessoa) => {

    let cabecalho = {
        method: "PUT", headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(pessoa)
    }

    const response = await fetch(UrlCriacao, cabecalho)



    fetchApiListaDePessoas()

    return response;
}

async function fetchApiEdicao (pessoa){

    let cabecalho = {
        method: "POST", headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(pessoa)
    }

    console.log(JSON.stringify(pessoa))

    const response = await fetch(UrlEdicao, cabecalho)

    return response;
}

async  function fetchApiExcluir(id){
    let UrlExcluir = `http://localhost:8080/desafio05/cadastro/delete/${id}`

    let cabecalho = {
        method: "DELETE", headers: {
            'Content-Type': 'application/json',
        }
    }

    const response = await fetch(UrlExcluir,cabecalho)

    fetchApiListaDePessoas()

}

async  function fetchApiExcluirContato(id){
    let UrlExcluirContato = `http://localhost:8080/desafio05/cadastro/deletecontato/${id}`

    let cabecalho = {
        method: "DELETE", headers: {
            'Content-Type': 'application/json',
        }
    }

    const response = await fetch(UrlExcluirContato,cabecalho)

    fetchApiListaDePessoas()

}



async function fetchApiListaDePessoas() {

    limparListaDePessoas()

    let cabecalho = {
        method: "GET", headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(UrlLista, cabecalho).then((res) => res.json()).then((data) => {
        return data
    })

    listaJson = (response)


    for( let i = 0 ; i < listaJson.length ; i++){

        pessoa = new Pessoa();
        pessoa.setNome(listaJson[i].nome)
        pessoa.setCpf(listaJson[i].cpf);
        pessoa.setEmail(listaJson[i].email)
        pessoa.setTelefone(listaJson[i].telefone)
        pessoa.setId(listaJson[i].id);
        pessoa.setCidade(listaJson[i].endereco.cidade)
        pessoa.setLote(listaJson[i].endereco.lote)
        pessoa.setQuadra(listaJson[i].endereco.quadra)
        pessoa.setRua(listaJson[i].endereco.rua)



        for(let j = 0; j < listaJson[i].contatos.length;j++){
            contato = new Contato();
            contato.setEmail(listaJson[i].contatos[j].email)
            contato.setNome(listaJson[i].contatos[j].nome)
            contato.setTelefone(listaJson[i].contatos[j].telefone)
            contato.setId(listaJson[i].contatos[j].id)

            pessoa.adicionarContato(contato)

        }

        listadepessoas.adicionarPessoa(pessoa)

    }
    preencherTabela()
}

function  limparListaDePessoas(){

    let numerosdepessoas = listadepessoas.getLista().length;

    for (let i = 0; i < numerosdepessoas; i++) {
        listadepessoas.getLista().shift();
    }
}

