public class UpdateScheduleRequest extends CreateScheduleRequest {
    private long environmentCode;

    public UpdateScheduleRequest(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, int warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode, long environmentCode) {
        super(loginUser, projectCode, workflowDefinitionCode, schedule, warningType, warningGroupId, failureStrategy, workflowInstancePriority, workerGroup, tenantCode);
        this.environmentCode = environmentCode;
    }

    // Getters and potential additional methods omitted for brevity
}