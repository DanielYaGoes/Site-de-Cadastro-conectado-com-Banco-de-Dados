class Pessoa {

    constructor(nome1, cpf1, email1, telefone1, cidade1, rua1, quadra1, lote1,id) {
        this.nome = nome1;
        this.cpf = cpf1;
        this.email = email1;
        this.telefone = telefone1;
        this.cidade = cidade1
        this.rua = rua1;
        this.quadra = quadra1;
        this.lote = lote1;
        this.id = id

        this.contatosdapessoa = [];
    }


    adicionarContato(contato) {
        this.contatosdapessoa.push(contato);
    }

    getId(){
        return this.id
    }

    getCidade() {
        return this.cidade;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    getCpf() {
        return this.cpf;
    }

    getRua() {
        return this.rua;
    }

    getQuadra() {
        return this.quadra;
    }

    getLote() {
        return this.lote;
    }

    getNome() {
        return this.nome;
    }

    getContato(index) {
        return this.contatosdapessoa[index];
    }

    getContatos() {
        return this.contatosdapessoa;
    }

    setContatos(contatos){
        this.contatosdapessoa = contatos
    }


    setCidade(cidade) {
        this.cidade = cidade
    }

    setCpf(cpf2) {
        this.cpf = cpf2
    }

    setEmail(email) {
        this.email = email;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }
    setRua(rua) {
        this.rua = rua;
    }

    setQuadra(quadra) {
        this.quadra = quadra;
    }

    setLote(lote) {
        this.lote = lote;
    }

    setNome(nome) {
        this.nome = nome;
    }

    setId(id){
        this.id = id;
    }

}