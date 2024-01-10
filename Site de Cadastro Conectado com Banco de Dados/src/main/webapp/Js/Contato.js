class Contato {
    constructor(nome1, email1, telefone1,id) {
        this.nome = nome1;
        this.email = email1;
        this.telefone = telefone1;
        this.id =id;
    }

    getNome() {
        return this.nome;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    getId(){
        return this.id
    }

    setNome(nome2) {
        this.nome = nome2;
    }

    setEmail(email2) {
        this.email = email2;
    }

    setTelefone(telefone2) {
        this.telefone = telefone2;
    }

    setId(id){
        this.id = id;
    }
}