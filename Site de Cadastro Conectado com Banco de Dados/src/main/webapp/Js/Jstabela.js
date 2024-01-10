let ctt = document.getElementById('tabelacontatos');
let interacao = document.getElementById('interacao');
let interacaocontatos = document.getElementById('contato2');
let index, acharpessoa;
let pessoas = document.getElementById('tabelausuario');

var contadordecontatos = 0;
var contadordepessoas = 0;

var contadordecontatossalvos = 0;
let validadorparaobotaodeusuario = true;
let validadorparaobotaodecontatos = true;

var contatos = [];

class Listadepessoas {
    constructor() {
        this.pessoas = [];
    }

    getLista() {
        return this.pessoas;
    }

    getListarpessoa(num) {
        return this.pessoas[num];
    }

    adicionarPessoa(pessoa) {
        this.pessoas.push(pessoa);
    }
}

let listadepessoas = new Listadepessoas();
fetchApiListaDePessoas()


function cadastrar(nome, cpf, emaildocadastro, telefone, cidade, rua, quadra, lote) {
    if (validaSeTemCampoEmBranco(nome, telefone, cidade, rua, quadra, lote) && VerificaCPF(cpf) && contadordecontatos >= 2 && validaEmail(emaildocadastro) && validaTelefone(telefone)) {

        pessoa = new Pessoa(nome, cpf, emaildocadastro, telefone, cidade, rua, quadra, lote);

        let numerodecontatos = contatos.length;

        for (let k = 0; k < numerodecontatos; k++) {
            pessoa.adicionarContato(contatos[k]);
        }

        fetchApiCriacao(pessoa)


        for (let i = 0; i < numerodecontatos; i++) {
            contatos.shift();
        }


        contadordecontatos = 0;
        contadordepessoas++;

        limparcampos();

    } else if (!(VerificaCPF(document.getElementById('cpf').value))) {

        window.alert('CPF informado é invalido, favor informar cpf valido');

    } else if (contadordecontatos < 2) {
        window.alert('Necessario inserir no minimo 2 contatos');

    }

}


function preencherTabela() {


    for (let j = pessoas.rows.length - 1; j > 0; j--) {

        pessoas.rows[j].remove();
    }


    for (let i = 0; i < listadepessoas.getLista().length; i++) {

        let qtdlinhas = pessoas.rows.length;

        let linha = pessoas.insertRow(qtdlinhas);

        let cnome = linha.insertCell(0);
        let ccpf = linha.insertCell(1);
        let cemail = linha.insertCell(2)
        let ctelefone = linha.insertCell(3);
        let botaovisualizar = linha.insertCell(4);

        botaovisualizar.innerHTML = 'Visualizar';
        botaovisualizar.setAttribute('id', 'botaovisualizar');

        cnome.innerHTML = listadepessoas.getListarpessoa(i).getNome();
        ccpf.innerHTML = listadepessoas.getListarpessoa(i).getCpf();
        ctelefone.innerHTML = listadepessoas.getListarpessoa(i).getTelefone();
        cemail.innerHTML = listadepessoas.getListarpessoa(i).getEmail();
    }

    preencherformulario()
}


function cadastrodecontato(nome, email, telefone) {
    alert("Contato adicionado")

    if (validaEmail(email) && !(telefone == "") && !(nome == "") && validaTelefone(telefone)) {
        contadordecontatos++;

        contatos.push(new Contato(nome, email, telefone));

        document.getElementById("contato").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefo").value = ""

        contadordecontatossalvos++;

    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
    }
    if ((nome == "")) {
        window.alert('Insira um nome');

    }

}


function preencherformulario() {


    for (let i = 0; i < pessoas.rows.length; i++) {

        pessoas.rows[i].onclick = function () {

            document.getElementById('contato').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefo').value = '';

            index = this.rowIndex;
            acharpessoa = index;

            let qtdlinhas2;
            let p = listadepessoas.getListarpessoa(index - 1);
            let ccontato
            let cemail
            let ctelefone

            document.getElementById('nomeesobrenome').value = p.getNome();
            document.getElementById('cpf').value = p.getCpf();
            document.getElementById('emaildocadastro').value = p.getEmail();
            document.getElementById('telefone').value = p.getTelefone();
            document.getElementById('cidade').value = p.getCidade();
            document.getElementById('rua').value = p.getRua();
            document.getElementById('quadra').value = p.getQuadra();
            document.getElementById('lote').value = p.getLote();

            for (let j = ctt.rows.length - 1; j > 0; j--) {
                ctt.rows[j].remove();
            }

            for (let j = 0; j < p.getContatos().length; j++) {

                qtdlinhas2 = ctt.rows.length;

                let linha2 = ctt.insertRow(qtdlinhas2);
                ccontato = linha2.insertCell(0);
                cemail = linha2.insertCell(1);
                ctelefone = linha2.insertCell(2);
                cbotaoeditar = linha2.insertCell(3);


                ccontato.innerHTML = p.getContatos()[j].getNome();
                cemail.innerHTML = p.getContatos()[j].getEmail();
                ctelefone.innerHTML = p.getContatos()[j].getTelefone();

                cbotaoeditar.setAttribute('id', 'botaovisualizar');

                cbotaoeditar.innerHTML = '<input type="button" value="Editar">'

                preencherContatos()
            }

            document.getElementById('botaodecadastrarusuario').value = 'Cadastrar Novo Usuario';
            document.getElementById('botaodecadastrarusuario').removeAttribute('onclick');
            document.getElementById('botaodecadastrarusuario').setAttribute('onclick', 'iniciarNovoCadastro()');


            document.getElementById('salvarcontato').setAttribute('value', 'Adicionar Contato');
            document.getElementById('salvarcontato').setAttribute('onclick', 'adicionarNovoContato()');


            let botaodesalvar = document.createElement('input');
            let botaodeexcluir = document.createElement('input');

            botaodesalvar.setAttribute('id', 'botaodesalvar');
            botaodesalvar.setAttribute('type', 'button');
            botaodesalvar.setAttribute('value', 'Salvar Edição');
            botaodesalvar.setAttribute('class', 'enviar');
            botaodesalvar.setAttribute('onclick', 'salvarEdicaodeUsuario()');

            botaodeexcluir.setAttribute('id', 'botaodeexcluir');
            botaodeexcluir.setAttribute('type', 'button');
            botaodeexcluir.setAttribute('value', 'Excluir Usuario');
            botaodeexcluir.setAttribute('class', 'enviar');
            botaodeexcluir.setAttribute('onclick', 'ExcluirUsuario()');


            if (validadorparaobotaodeusuario ) {
                validadorparaobotaodeusuario = false;
                interacao.appendChild(botaodeexcluir);
                interacao.appendChild(botaodesalvar);

            }
        }
    }
}


function iniciarNovoCadastro() {
    validadorparaobotaodeusuario = true;
    limparcampos()

    document.getElementById('botaodecadastrarusuario').value = 'Cadastrar Usuario';
    document.getElementById('botaodecadastrarusuario').removeAttribute('onclick');
    document.getElementById('botaodecadastrarusuario').setAttribute('onclick', 'cadastrar(nomeesobrenome.value,cpf.value,emaildocadastro.value,telefone.value,cidade.value,rua.value,quadra.value,lote.value)');
    document.getElementById('salvarcontato').setAttribute('onclick', 'cadastrodecontato(contato.value,email.value,telefo.value)');

    interacao.removeChild(document.getElementById('botaodesalvar'));
    interacao.removeChild(document.getElementById('botaodeexcluir'));

    for (let j = ctt.rows.length - 1; j > 0; j--) {
        ctt.rows[j].remove();
    }

    if (!validadorparaobotaodecontatos) {
        interacaocontatos.removeChild(document.getElementById('botaodesalvarcontato'));
        interacaocontatos.removeChild(document.getElementById('botaodeexcluircontato'));
        validadorparaobotaodecontatos = true;
    }

}

function limparcampos() {
    document.getElementById('nomeesobrenome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('quadra').value = '';
    document.getElementById('lote').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('emaildocadastro').value = '';

    document.getElementById('contato').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefo').value = '';
}


function salvarEdicaodeUsuario() {

    let pessoa = listadepessoas.getListarpessoa(acharpessoa - 1);

    pessoa.setNome(document.getElementById('nomeesobrenome').value);
    pessoa.setCidade(document.getElementById('cidade').value);
    pessoa.setRua(document.getElementById('rua').value);
    pessoa.setQuadra(document.getElementById('quadra').value);
    pessoa.setLote(document.getElementById('lote').value);

    pessoa.setCpf(document.getElementById('cpf').value);
    pessoas.rows[index].cells[1].innerHTML = pessoa.getCpf();

    pessoa.setEmail(document.getElementById('emaildocadastro').value);

    if (validaTelefone(document.getElementById('telefone').value)) {
        pessoa.setTelefone(document.getElementById('telefone').value);
    }

    pessoas.rows[index].cells[0].innerHTML = pessoa.getNome();
    pessoas.rows[index].cells[2].innerHTML = pessoa.getEmail();
    pessoas.rows[index].cells[3].innerHTML = pessoa.getTelefone();



    fetchApiEdicao(pessoa)

}

function ExcluirUsuario() {
    let cpf = '';
    contadordepessoas--;

   for (let j = ctt.rows.length - 1; j > 0; j--) {
        ctt.rows[j].remove();
    }

    let pessoa = listadepessoas.getListarpessoa(acharpessoa - 1)

    fetchApiExcluir(pessoa.getId())

    iniciarNovoCadastro();

}

function preencherContatos() {
    ctt = document.getElementById('tabelacontatos');

    for (let i = 0; i < ctt.rows.length; i++) {
        ctt.rows[i].onclick = function () {

            index = this.rowIndex;

            document.getElementById('contato').value = ctt.rows[index].cells[0].innerText;
            document.getElementById('email').value = ctt.rows[index].cells[1].innerText;
            document.getElementById('telefo').value = ctt.rows[index].cells[2].innerText;


            let botaodesalvarcontato = document.createElement('input');

            botaodesalvarcontato.setAttribute('id', 'botaodesalvarcontato');
            botaodesalvarcontato.setAttribute('type', 'button');
            botaodesalvarcontato.setAttribute('value', 'Editar Contato');
            botaodesalvarcontato.setAttribute('class', 'enviar2');
            botaodesalvarcontato.setAttribute('onclick', 'salvarEdicaodeContato()');

            let botaodeexcluircontato = document.createElement('input');

            botaodeexcluircontato.setAttribute('id', 'botaodeexcluircontato');
            botaodeexcluircontato.setAttribute('type', 'button');
            botaodeexcluircontato.setAttribute('value', 'Excluir Contato');
            botaodeexcluircontato.setAttribute('class', 'enviar2');
            botaodeexcluircontato.setAttribute('onclick', 'excluirContato()');

            if (validadorparaobotaodecontatos) {

                interacaocontatos.appendChild(botaodesalvarcontato);
                interacaocontatos.appendChild(botaodeexcluircontato);
                validadorparaobotaodecontatos = false;
            }

        }
    }
}

function excluirContato() {

    ctt = document.getElementById('tabelacontatos');
    let pessoa = listadepessoas.getListarpessoa(acharpessoa - 1)

    if (pessoa.getContatos().length > 2) {
        let id = pessoa.getContatos()[index-1].getId()
        pessoa.getContatos().splice(index - 1, 1);


        for (let j = ctt.rows.length - 1; j > 0; j--) {
            ctt.rows[j].remove();
        }

        for (let j = 0; j < pessoa.getContatos().length; j++) {

            let qtdlinhas2 = ctt.rows.length;

            let linha2 = ctt.insertRow(qtdlinhas2);
            let ccontato = linha2.insertCell(0);
            let cemail = linha2.insertCell(1);
            let ctelefone = linha2.insertCell(2);
            let cbotaoeditar = linha2.insertCell(3);


            ccontato.innerHTML = pessoa.getContatos()[j].getNome();
            cemail.innerHTML = pessoa.getContatos()[j].getEmail();
            ctelefone.innerHTML = pessoa.getContatos()[j].getTelefone();

            cbotaoeditar.setAttribute('id', 'botaovisualizar');

            cbotaoeditar.innerHTML = '<input type="button" value="Editar">';

            document.getElementById('contato').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefo').value = '';

        }
        validadorparaobotaodecontatos = false;

        preencherContatos();
        fetchApiExcluirContato(id)
    } else {
        alert('O usuario não pode ter menos de 2 contatos')
    }
}

function adicionarNovoContato() {

    var pessoa = listadepessoas.getListarpessoa(acharpessoa - 1);
    let email = document.getElementById('email').value;
    let nome = document.getElementById('contato').value;
    let telefone = document.getElementById('telefo').value;


    if (validaEmail(email) && !(telefone == "") && !(nome == "") ) {

        pessoa.getContatos().push(new Contato(document.getElementById('contato').value,
            document.getElementById('email').value,
            document.getElementById('telefo').value));

        for (let j = ctt.rows.length - 1; j > 0; j--) {
            ctt.rows[j].remove();
        }
        for (let j = 0; j < pessoa.getContatos().length; j++) {

            let qtdlinhas2 = ctt.rows.length;

            let linha2 = ctt.insertRow(qtdlinhas2);
            ccontato = linha2.insertCell(0);
            cemail = linha2.insertCell(1);
            ctelefone = linha2.insertCell(2);
            cbotaoeditar = linha2.insertCell(3);


            ccontato.innerHTML = pessoa.getContatos()[j].getNome();
            cemail.innerHTML = pessoa.getContatos()[j].getEmail();
            ctelefone.innerHTML = pessoa.getContatos()[j].getTelefone();

            cbotaoeditar.setAttribute('id', 'botaovisualizar');

            cbotaoeditar.innerHTML = '<input type="button" value="Editar">'

            preencherContatos()
        }

        fetchApiEdicao(pessoa)

    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
        // document.getElementById("telefo").style.border = "2px solid red";
    }
    if ((nome == "")) {
        window.alert('Insira um nome');
        // document.getElementById("contato").style.border = "2px solid red";
    }


}


function salvarEdicaodeContato() {
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefo').value;
    let nome = document.getElementById('contato').value

    if ( validaEmail(email) && !(telefone == "") && !(nome == "")) {
        let pessoa = listadepessoas.getListarpessoa(acharpessoa - 1);

        pessoa.getContato(index - 1).setNome(nome);
        pessoa.getContato(index - 1).setEmail(email);
        pessoa.getContato(index - 1).setTelefone(telefone);

        ctt.rows[index].cells[0].innerHTML = pessoa.getContato(index - 1).getNome();
        ctt.rows[index].cells[1].innerHTML = pessoa.getContato(index - 1).getEmail();
        ctt.rows[index].cells[2].innerHTML = pessoa.getContato(index - 1).getTelefone();

        fetchApiEdicao(pessoa)
    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
        // document.getElementById("telefo").style.border = "2px solid red";
    }
    if ((nome == "")) {
        window.alert('Insira um nome');
        // document.getElementById("contato").style.border = "2px solid red";
    }

}

function validaEmail(email) {
    let validacaoRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validacaoRegex.test(email)) {
        alert('E-mail invalido');

    }

    return validacaoRegex.test(email);
}

function validaTelefone(telefone) {
    let validacaoRegex = /^\d{2}\s?\d{4,5}-?\d{4}$/;
    if (!validacaoRegex.test(telefone)) {
        alert('Telefone invalido');
    }
    return validacaoRegex.test(telefone);
}


function VerificaCPF(strCpf) {

    var soma;
    var resto;
    soma = 0;
    if (strCpf == "00000000000") {
        return false;
    }
    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function validaSeTemCampoEmBranco(nome, telefone, cidade, rua, quadra, lote) {
    if (nome != '' && telefone != '' && cidade != '' && rua != '' && quadra != '' && lote != '') {
        return true

    }
    if (nome == '') {
        alert('preencha o campo de Nome');
    }
    if (telefone == '') {
        alert('preencha o campo de Telefone');
    }
    if (cidade == '') {
        alert('preencha o campo de Cidade');
    }
    if (rua == '') {
        alert('preencha o campo de Rua');
    }
    if (quadra == '') {
        alert('preencha o campo de Quadra');
    }
    if (lote == '') {
        alert('preencha o campo de Lote');
    }

    return false
}