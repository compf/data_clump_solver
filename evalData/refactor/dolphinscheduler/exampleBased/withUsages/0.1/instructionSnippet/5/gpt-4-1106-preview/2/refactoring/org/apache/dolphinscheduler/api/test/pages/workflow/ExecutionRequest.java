package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;

public class ExecutionRequest {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;

    public ExecutionRequest(User loginUser, long projectCode, int workflowInstanceId) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
    }

    // Getters and Setters
}