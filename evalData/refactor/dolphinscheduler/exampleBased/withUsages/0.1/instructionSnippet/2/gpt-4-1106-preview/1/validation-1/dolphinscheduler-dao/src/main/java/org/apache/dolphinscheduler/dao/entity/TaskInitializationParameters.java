import java.util.Date;

public class TaskInitializationParameters {
    private String host;
    private Date startTime;

    public TaskInitializationParameters(String host, Date startTime) {
        this.host = host;
        this.startTime = startTime;
    }

    public String getHost() {
        return host;
    }

    public Date getStartTime() {
        return startTime;
    }
}