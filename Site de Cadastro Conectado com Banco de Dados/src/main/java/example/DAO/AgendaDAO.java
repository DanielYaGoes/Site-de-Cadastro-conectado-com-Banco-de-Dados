package example.DAO;

import example.connection.Connection;
import example.codigoprincipal.*;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;

import javax.persistence.EntityManager;
import javax.ws.rs.QueryParam;
import java.util.List;


public class AgendaDAO {


    public Pessoa findPessoaById(Integer id) {
        EntityManager em = Connection.getConnection();
        Session session = em.unwrap(Session.class);

        Criteria criteria = session.createCriteria(Pessoa.class);
        Criterion restricao = Restrictions.eq("id", id);

        criteria.add(restricao);

        return (Pessoa) criteria.uniqueResult();
    }

    public List<Pessoa> findAllPessoa() {
        EntityManager em = Connection.getConnection();
        Session session = em.unwrap(Session.class);
        Criteria criteria = session.createCriteria(Pessoa.class, "bean");
//
//        ProjectionList projectionList = Projections.projectionList();
//
//        projectionList.add(Projections.property("bean.id").as("id"));
//        projectionList.add(Projections.property("bean.nome").as("nome"));
//        projectionList.add(Projections.property("bean.cpf").as("cpf"));
//        projectionList.add(Projections.property("bean.email").as("email"));
//        projectionList.add(Projections.property("bean.telefone").as("telefone"));
//        projectionList.add(Projections.property("bean.endereco").as("endereco"));
//
//        criteria.setProjection(projectionList);
//        criteria.setResultTransformer(new AliasToBeanResultTransformer(Pessoa.class));


        return criteria.list();
    }

    public List<Contato> retornaContatosDaPessoa(Pessoa pessoa) {
        EntityManager em = Connection.getConnection();
        Session session = em.unwrap(Session.class);
        Criteria criteria = session.createCriteria(Contato.class, "bean");

        ProjectionList projectionList = Projections.projectionList();

        projectionList.add(Projections.property("bean.id").as("id"));
        projectionList.add(Projections.property("bean.nome").as("nome"));
        projectionList.add(Projections.property("bean.email").as("email"));
        projectionList.add(Projections.property("bean.telefone").as("telefone"));
        projectionList.add(Projections.property("bean.pessoa").as("pessoa"));

        Criterion criterion = Restrictions.eq("bean.pessoa", pessoa);

        criteria.add(criterion);
        criteria.setProjection(projectionList);
        criteria.setResultTransformer(new AliasToBeanResultTransformer(Contato.class));

        return (List<Contato>) criteria.list();

    }

    public Contato findContatoById(Integer id) {
        EntityManager em = Connection.getConnection();
        Session session = em.unwrap(Session.class);

        Criteria criteria = session.createCriteria(Contato.class);

        Criterion restricao = Restrictions.eq("id", id);

        criteria.add(restricao);

        return (Contato) criteria.uniqueResult();
    }


    public <T> T save(T t) {
        EntityManager em = Connection.getConnection();

        try {
            em.getTransaction().begin();
            em.persist(t);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
        return t;

    }


    public  void update(Pessoa pessoa) {
        EntityManager em = Connection.getConnection();

        try {
            em.getTransaction().begin();

            em.merge(pessoa);

            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
        } finally {
            em.close();
        }

    }

    public void deletePessoa( Integer id) {
        EntityManager em = Connection.getConnection();

        try {
            em.getTransaction().begin();

            Pessoa pessoa = em.find(Pessoa.class,id);

            if (pessoa != null) {

                em.remove(pessoa);

                System.out.println("Exclusão feita");
            } else {
                System.out.println("Não encontrado");
            }

            em.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
        } finally {
            em.close();
        }

    }

    public void deleteContato( Integer id) {
        EntityManager em = Connection.getConnection();

        try {
            em.getTransaction().begin();

            Contato contato = em.find(Contato.class,id);

            if (contato != null) {

                em.remove(contato);

                System.out.println("Exclusão feita");
            } else {
                System.out.println("Não encontrado");
            }

            em.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
        } finally {
            em.close();
        }

    }

}


