public class TaskExecutionEnvironment {
    private Date submitTime;
    private Date startTime;
    private Date endTime;
    private String host;
    private String executePath;
    private String logPath;

    public TaskExecutionEnvironment(Date submitTime, Date startTime, Date endTime, String host, String executePath, String logPath) {
        this.submitTime = submitTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.host = host;
        this.executePath = executePath;
        this.logPath = logPath;
    }

    // Getters and setters
}