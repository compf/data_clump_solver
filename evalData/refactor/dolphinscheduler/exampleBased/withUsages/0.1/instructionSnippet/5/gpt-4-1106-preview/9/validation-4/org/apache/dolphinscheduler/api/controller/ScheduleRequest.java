public class ScheduleRequest {
    private long workflowDefinitionCode;
    private String schedule;
    private WarningType warningType;
    private int warningGroupId;
    private FailureStrategy failureStrategy;
    private String workerGroup;
    private String tenantCode;
    private Long environmentCode;
    private Priority workflowInstancePriority;

    // Getters and setters for all fields
}