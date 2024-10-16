public class ExecutionRequest {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;

    public ExecutionRequest(User loginUser, long projectCode, int workflowInstanceId) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("loginUser", loginUser);
        params.put("projectCode", projectCode);
        params.put("workflowInstanceId", workflowInstanceId);
        return params;
    }
}