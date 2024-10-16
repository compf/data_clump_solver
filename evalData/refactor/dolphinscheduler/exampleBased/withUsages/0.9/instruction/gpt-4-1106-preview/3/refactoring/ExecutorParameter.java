public class ExecutorParameter {

    private final User loginUser;
    private final long projectCode;
    private final long workflowDefinitionCode;
    private final String scheduleTime;
    private final FailureStrategy failureStrategy;
    private final WarningType warningType;

    // Constructor, getters and other methods...

    public Map<String, Object> toMap() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("loginUser", loginUser);
        parameters.put("workflowDefinitionCode", workflowDefinitionCode);
        parameters.put("scheduleTime", scheduleTime);
        parameters.put("failureStrategy", failureStrategy);
        parameters.put("warningType", warningType);
        return parameters;
    }
}