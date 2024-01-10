package example.rest;

import example.DAO.AgendaDAO;
import example.codigoprincipal.Pessoa;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.annotation.PostConstruct;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/cadastro")

public class Controller {
    private AgendaDAO AgendaDAO;

    @PostConstruct
    private void init() {
        AgendaDAO = new AgendaDAO();
    }

    @GET
    @Path("/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retornaListaDePessoas() {

        List<Pessoa> pessoas = AgendaDAO.findAllPessoa();
        JSONArray jsonArray = null;

        try {

             jsonArray = new JSONArray();
            for (Pessoa pessoa: pessoas){
                jsonArray.put(pessoa.toJSON());

            }
        } catch (Exception e) {

            e.printStackTrace();
        }


        return Response.ok(jsonArray.toString()).build();
    }
    @POST
    @Path("/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editarPessoa(String data) {
            Pessoa pessoa = null;
        try {
            pessoa = new Pessoa(data);
            AgendaDAO.update(pessoa);

        } catch (Exception e) {

            e.printStackTrace();
        }
        return Response.ok(pessoa.toString()).build();
    }

    @DELETE
    @Path("delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removerPessoa(@PathParam("id") Integer id) {
        String mensagem = "";
        try {
            AgendaDAO.deletePessoa(id);
            mensagem = "Pessoa removida com sucesso";
        } catch (Exception e) {
            mensagem = "Erro ao remover Pessoa";

        }

        return Response.ok(mensagem).build();
    }

    @DELETE
    @Path("deletecontato/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removerContato(@PathParam("id") Integer id) {
        String mensagem = "";
        try {
            AgendaDAO.deleteContato(id);
            mensagem = "Contato removida com sucesso";
        } catch (Exception e) {
            mensagem = "Erro ao remover Pessoa";

        }

        return Response.ok(mensagem).build();
    }

    @PUT
    @Path("/criar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void adicionarPessoa(String data) {
        try {

            Pessoa pessoa = new Pessoa(data);

            AgendaDAO.save(pessoa);

        } catch (Exception e) {

            e.printStackTrace();
        }

    }


}
