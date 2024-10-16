package org.apache.dolphinscheduler.api.test.entity;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.WarningType;

import java.util.HashMap;
import java.util.Map;

public class ExecutionParameters {

    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    public Map<String, Object> toMap() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("loginUser", loginUser);
        parameters.put("workflowDefinitionCode", workflowDefinitionCode);
        parameters.put("scheduleTime", scheduleTime);
        parameters.put("failureStrategy", failureStrategy);
        parameters.put("warningType", warningType);
        return parameters;
    }

    // Getters and Setters
}