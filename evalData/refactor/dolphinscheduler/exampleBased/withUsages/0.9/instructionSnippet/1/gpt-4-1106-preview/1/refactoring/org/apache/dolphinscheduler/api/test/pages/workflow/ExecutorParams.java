public class ExecutorParams {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;
    private ExecuteType executeType;

    public ExecutorParams(User loginUser, long projectCode, int workflowInstanceId, ExecuteType executeType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.executeType = executeType;
    }

    // Getters and potential additional methods omitted for brevity
}