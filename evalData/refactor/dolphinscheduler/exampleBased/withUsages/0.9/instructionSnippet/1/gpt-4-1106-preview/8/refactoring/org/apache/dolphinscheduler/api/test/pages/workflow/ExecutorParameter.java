package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.api.enums.ExecuteType;
import org.apache.dolphinscheduler.dao.entity.User;

public class ExecutorParameter {

    private final User loginUser;
    private final long projectCode;
    private final int workflowInstanceId;
    private final ExecuteType executeType;

    public ExecutorParameter(User loginUser, long projectCode, int workflowInstanceId, ExecuteType executeType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.executeType = executeType;
    }

    // Getters
}