package example.codigoprincipal;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@XmlRootElement
@Entity
@Table(name = "pessoa")

public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    private String cpf;

    private String email;

    private String telefone;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Contato> contatos = new ArrayList<Contato>();

    public Pessoa() {
    }

    public Pessoa(String data) {
        JSONObject jsonObject = new JSONObject(data);

        this.setCpf(jsonObject.getString("cpf"));
        this.setNome(jsonObject.getString("nome"));
        this.setTelefone(jsonObject.getString("telefone"));
        this.setEmail(jsonObject.getString("email"));

        if(jsonObject.has("id")){
        this.id = jsonObject.getInt("id");}

        Endereco endereco = new Endereco();

        endereco.setPessoa(this);
        endereco.setCidade(jsonObject.getString("cidade"));
        endereco.setLote(jsonObject.getInt("lote"));
        endereco.setQuadra(jsonObject.getInt("quadra"));
        endereco.setRua(jsonObject.getString("rua"));

        this.setEndereco(endereco);

        if(jsonObject.has("contatosdapessoa")){

            JSONArray jsonArray = jsonObject.getJSONArray("contatosdapessoa");
            for(Object object: jsonArray){

                JSONObject jsonObj = (JSONObject) object;

                if(jsonObj.has("id")){
                    Contato contato = new Contato( jsonObj.getString("nome"), jsonObj.getString("email"), jsonObj.getString("telefone"));
                    contato.setPessoa(this);
                    contato.setId(jsonObj.getInt("id"));
                    this.contatos.add(contato);
                }
                else{
                    Contato contato = new Contato(jsonObj.getString("nome"), jsonObj.getString("email"), jsonObj.getString("telefone"));
                    contato.setPessoa(this);
                    this.contatos.add(contato);
                }
            }
        }



    }

    public void adicionarnovocontato(Contato contato) {
        this.contatos.add(contato);
    }

    @XmlElement
    public void listarContatos() {
        for (Contato contato : contatos) {
            System.out.println("| Id: "+contato.getId() + " | Nome: " + contato.getNome() + " | E-mail: " + contato.getEmail() + " | Telefone: "
                    + contato.getTelefone());
        }
        ;

    }

    public JSONObject toJSON(){
        JSONObject jsonObject = new JSONObject();

        if(getId() != null){
            jsonObject.put("id", getId());
        }
        if(getNome() != null){
            jsonObject.put("nome", getNome());
        }
        if(getEmail() != null){
            jsonObject.put("email", getEmail());
        }
        if(getCpf() != null){
            jsonObject.put("cpf", getCpf());
        }
        if(getTelefone() != null){
            jsonObject.put("telefone", getTelefone());
        }
        if(getEndereco() != null){
            jsonObject.put("endereco", getEndereco().toJSON());
        }

        if(contatos != null){
            JSONArray jsonArray = new JSONArray();
            for(Contato contato: contatos ){
                jsonArray.put(contato.toJSON());
            }
            jsonObject.put("contatos", jsonArray);
        }
        return jsonObject;

    }

    @XmlElement
    public Integer getId() {
        return id;
    }

    @XmlElement
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @XmlElement
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @XmlElement
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @XmlElement
    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Contato> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
    }

}
