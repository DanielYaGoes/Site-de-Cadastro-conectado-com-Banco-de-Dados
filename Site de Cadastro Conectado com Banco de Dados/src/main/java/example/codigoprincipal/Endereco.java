package example.codigoprincipal;

import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Table(name = "endereco")
public class Endereco {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private Pessoa pessoa;

    private String cidade;

    private String rua;

    private int quadra;

    private int lote;


    public Endereco() {

    }

    public Endereco(String cidade, String Bairro, String rua, int quadra, int lote) {
        this.cidade = cidade;
        this.rua = rua;
        this.quadra = quadra;
        this.lote = lote;

    }

    public Endereco(int id_endereco, String cidade, String Bairro, String rua, int quadra, int lote) {
        this.cidade = cidade;
        this.rua = rua;
        this.quadra = quadra;
        this.lote = lote;

        this.id = id_endereco;
    }

    @OneToOne(mappedBy = "Pessoa")
    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public JSONObject toJSON(){
        JSONObject jsonObject = new JSONObject();

        if(getId() != null){
            jsonObject.put("id", getId());
        }
        if(getCidade() != null){
            jsonObject.put("cidade", getCidade());
        }
        if(getRua() != null){
            jsonObject.put("rua", getRua());
        }
        if(getQuadra() != 0 ){
            jsonObject.put("quadra", getQuadra());
        }
        if(getLote() != 0){
            jsonObject.put("lote", getLote());
        }
        return jsonObject;

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }


    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public int getQuadra() {
        return quadra;
    }

    public void setQuadra(int quadra) {
        this.quadra = quadra;
    }

    public int getLote() {
        return lote;
    }

    public void setLote(int lote) {
        this.lote = lote;
    }

}
