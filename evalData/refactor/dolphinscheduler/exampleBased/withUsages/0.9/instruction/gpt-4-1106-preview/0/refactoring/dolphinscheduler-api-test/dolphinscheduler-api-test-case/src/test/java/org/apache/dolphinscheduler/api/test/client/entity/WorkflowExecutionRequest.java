package org.apache.dolphinscheduler.api.test.client.entity;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class WorkflowExecutionRequest {
    private long workflowDefinitionCode;
    private String scheduleTime;
    private String failureStrategy;
    private String warningType;

    // Convert the request data to Map format
    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("workflowDefinitionCode", workflowDefinitionCode);
        params.put("scheduleTime", scheduleTime);
        params.put("failureStrategy", failureStrategy);
        params.put("warningType", warningType);
        return params;
    }
}
