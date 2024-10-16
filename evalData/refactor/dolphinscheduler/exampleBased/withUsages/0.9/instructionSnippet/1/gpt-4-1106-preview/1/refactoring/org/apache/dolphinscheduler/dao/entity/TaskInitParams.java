public class TaskInitParams {
    private String host;
    private Date startTime;
    private String executePath;

    public TaskInitParams(String host, Date startTime, String executePath) {
        this.host = host;
        this.startTime = startTime;
        this.executePath = executePath;
    }

    // Getters and potential additional methods omitted for brevity
}