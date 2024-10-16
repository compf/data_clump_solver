package org.apache.dolphinscheduler.api.test.pages.workflow;

import java.util.HashMap;
import java.util.Map;

public class ExecutionParameters {
    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    // getters and setters

    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("loginUser", loginUser);
        params.put("workflowDefinitionCode", workflowDefinitionCode);
        params.put("scheduleTime", scheduleTime);
        params.put("failureStrategy", failureStrategy);
        params.put("warningType", warningType);
        return params;
    }
}
