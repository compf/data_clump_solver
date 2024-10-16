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

    public ScheduleRequest(long workflowDefinitionCode, String schedule, WarningType warningType, int warningGroupId, FailureStrategy failureStrategy, String workerGroup, String tenantCode, Long environmentCode, Priority workflowInstancePriority) {
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.schedule = schedule;
        this.warningType = warningType;
        this.warningGroupId = warningGroupId;
        this.failureStrategy = failureStrategy;
        this.workerGroup = workerGroup;
        this.tenantCode = tenantCode;
        this.environmentCode = environmentCode;
        this.workflowInstancePriority = workflowInstancePriority;
    }

    // Getters and setters
}