public class WorkflowInstanceRequest {

    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    // getters and setters
}

public class TaskExecutionRequest {

    private int workflowInstanceId;
    private String startNodeList;
    private TaskDependType taskDependType;

    // getters and setters
}