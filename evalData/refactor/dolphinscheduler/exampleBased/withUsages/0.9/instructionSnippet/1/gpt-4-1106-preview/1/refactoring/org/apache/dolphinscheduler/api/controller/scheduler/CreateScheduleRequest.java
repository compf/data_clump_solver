public class CreateScheduleRequest {
    private User loginUser;
    private long projectCode;
    private long workflowDefinitionCode;
    private String schedule;
    private WarningType warningType;
    private int warningGroupId;
    private FailureStrategy failureStrategy;
    private Priority workflowInstancePriority;
    private String workerGroup;
    private String tenantCode;

    public CreateScheduleRequest(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, int warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode) {
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
    }

    // Getters and potential additional methods omitted for brevity
}