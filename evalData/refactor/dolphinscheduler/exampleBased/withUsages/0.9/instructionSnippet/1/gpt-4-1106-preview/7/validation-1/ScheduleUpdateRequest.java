public class ScheduleUpdateRequest extends ScheduleRequest {
    public ScheduleUpdateRequest(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, Integer warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode, long environmentCode) {
        super(loginUser, projectCode, workflowDefinitionCode, schedule, warningType, warningGroupId, failureStrategy, workflowInstancePriority, workerGroup, tenantCode, environmentCode);
    }
}