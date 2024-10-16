public class WorkflowInstanceDto {
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    public Map<String, Object> toParamsMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("workflowDefinitionCode", workflowDefinitionCode);
        params.put("scheduleTime", scheduleTime);
        params.put("failureStrategy", failureStrategy);
        params.put("warningType", warningType);
        return params;
    }
}