package migrate;
import org.flywaydb.core.Flyway;
public class Migration {

    public static void main(String[] args) {
        var url = "jdbc:postgresql://localhost:6002/demo?currentSchema=public";
        var user = "demo";
        var password = "demo";
        var locations = "classpath:DB-MIGRATION";
        var migration = Flyway.configure().dataSource(url, user, password).locations(locations).load();
        migration.migrate();
    }
}
