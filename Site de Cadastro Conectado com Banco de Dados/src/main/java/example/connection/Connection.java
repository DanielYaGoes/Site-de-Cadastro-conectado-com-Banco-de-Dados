package example.connection;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class Connection {
    private static EntityManagerFactory EntityManagerFactory = Persistence.createEntityManagerFactory("Desafio-05");

    public static EntityManager getConnection() {
        return EntityManagerFactory.createEntityManager();
    }


}
