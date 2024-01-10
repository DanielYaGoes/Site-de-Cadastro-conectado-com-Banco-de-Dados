package example.codigoprincipal;


import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "contatos")
public class Contato {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Pessoa pessoa;

    private String nome;

    private String email;

    private String telefone;

    public Contato() {

    }

    public Contato(String nome, String email, String telefone) {

        this.nome = nome;
        this.email = email;
        this.telefone = telefone;

    }

    public JSONObject toJSON(){
        JSONObject jsonObject = new JSONObject();

        if(getId() != null){
            jsonObject.put("id", getId());
        }
        if(getNome() != null){
            jsonObject.put("nome", getNome());
        }
        if(getTelefone() != null){
            jsonObject.put("telefone", getTelefone());
        }
        if(getEmail() != null){
            jsonObject.put("email", getEmail());
        }
        return jsonObject;
    }

    public Integer getId() {
        return this.id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setId(Integer id){
        this.id = id;
    }


    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return "\nID: " + this.getId() + "| Nome: " + this.getNome() + "| E-mail: " + this.getEmail() + "| Telefone: "
                + this.getTelefone();
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
}
