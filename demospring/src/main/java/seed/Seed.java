package seed;

import com.example.demospring.helpers.CryptoHelper;
import com.example.demospring.models.persistence.User;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import javax.persistence.*;
import javax.sql.DataSource;
import java.util.Properties;
import java.util.UUID;

public class Seed {

    public static void main(String[] args) {
        LocalContainerEntityManagerFactoryBean emf = new LocalContainerEntityManagerFactoryBean();
        emf.setDataSource(dataSource());
        emf.setPackagesToScan("com.example.demospring.models.persistence");
        emf.setJpaProperties(createConnectionProperties());
        emf.setPersistenceUnitName("jpa");
        emf.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        emf.afterPropertiesSet();
        EntityManager em = emf.getObject().createEntityManager();
        try {
            EntityTransaction etr = em.getTransaction();
            Query q = em.createNativeQuery("delete from users");
            etr.begin();
            q.executeUpdate();
            em.persist(createUser("superuser", "1234"));
            em.persist(createUser("superuser2", "1234"));
            em.persist(createUser("superuser3", "1234"));
            em.persist(createUser("superuser4", "1234"));
            etr.commit();
        } finally {
            em.close();
        }
    }

    private static User createUser(String userName, String password) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setLoginName(userName);
        CryptoHelper util = new CryptoHelper();
        String salt = util.createSalt();
        String hash = util.createHash(password, salt);
        user.setPasswordHash(hash);
        user.setSalt(salt);
        return user;
    }

    private static Properties createConnectionProperties() {
        var properties = new Properties();
        properties.put("hibernate.connection.url", "jdbc:postgresql://localhost:6002/demo?currentSchema=public");
        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQL95Dialect");
        properties.put("hibernate.connection.driver_class", "org.postgresql.Driver");
        properties.put("hibernate.connection.username", "demo");
        properties.put("hibernate.connection.password", "demo");
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.naming-strategy", "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");
        return properties;
    }

    private static DataSource dataSource() {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:postgresql://localhost:6002/demo?currentSchema=public");
        dataSourceBuilder.username("demo");
        dataSourceBuilder.password("demo");
        return dataSourceBuilder.build();
    }
}
