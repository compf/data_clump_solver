package org.apache.dolphinscheduler.api.test.pages.workflow;

import java.util.Map;

public class ExecutorParameter {

    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    // Getters and Setters

    public Map<String, Object> toMap() {
        // Convert properties to map and return
    }
}