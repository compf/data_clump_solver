public class TaskExecutionParameters {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;
    private String startNodeList;
    private TaskDependType taskDependType;

    public TaskExecutionParameters(User loginUser, long projectCode, int workflowInstanceId, String startNodeList, TaskDependType taskDependType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.startNodeList = startNodeList;
        this.taskDependType = taskDependType;
    }

    // method to convert parameters to map similar to ExecutionParameters
}