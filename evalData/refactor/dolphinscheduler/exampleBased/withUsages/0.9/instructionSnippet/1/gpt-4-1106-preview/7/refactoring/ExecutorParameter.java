public class ExecutorParameter {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;
    private ExecuteType executeType;

    public ExecutorParameter(User loginUser, long projectCode, int workflowInstanceId, ExecuteType executeType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.executeType = executeType;
    }

    // getters and setters
}