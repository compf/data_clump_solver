public class ScheduleRequest {
    private User loginUser;
    private long projectCode;
    private long workflowDefinitionCode;
    private String schedule;
    private WarningType warningType;
    private Integer warningGroupId;
    private FailureStrategy failureStrategy;
    private Priority workflowInstancePriority;
    private String workerGroup;
    private String tenantCode;
    private long environmentCode;

    public ScheduleRequest(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, Integer warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode, long environmentCode) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.schedule = schedule;
        this.warningType = warningType;
        this.warningGroupId = warningGroupId;
        this.failureStrategy = failureStrategy;
        this.workflowInstancePriority = workflowInstancePriority;
        this.workerGroup = workerGroup;
        this.tenantCode = tenantCode;
        this.environmentCode = environmentCode;
    }

    // getters and setters
}