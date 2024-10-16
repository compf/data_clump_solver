public class TaskExecutionRequest extends ExecutionRequest {
    private String startNodeList;
    private TaskDependType taskDependType;

    public TaskExecutionRequest(User loginUser, long projectCode, int workflowInstanceId, String startNodeList, TaskDependType taskDependType) {
        super(loginUser, projectCode, workflowInstanceId);
        this.startNodeList = startNodeList;
        this.taskDependType = taskDependType;
    }

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> params = super.toMap();
        params.put("startNodeList", startNodeList);
        params.put("taskDependType", taskDependType);
        return params;
    }
}