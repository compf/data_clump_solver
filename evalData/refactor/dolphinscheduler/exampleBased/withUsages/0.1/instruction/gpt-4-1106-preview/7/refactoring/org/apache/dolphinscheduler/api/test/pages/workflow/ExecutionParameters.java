package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;

import java.util.HashMap;
import java.util.Map;

public class ExecutionParameters {
    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;

    private ExecutionParameters(User loginUser, long workflowDefinitionCode, String scheduleTime) {
        this.loginUser = loginUser;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.scheduleTime = scheduleTime;
    }

    public static ExecutionParameters of(User loginUser, long workflowDefinitionCode, String scheduleTime) {
        return new ExecutionParameters(loginUser, workflowDefinitionCode, scheduleTime);
    }

    public Map<String, Object> toMap() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("loginUser", loginUser);
        parameters.put("workflowDefinitionCode", workflowDefinitionCode);
        parameters.put("scheduleTime", scheduleTime);
        return parameters;
    }
}
