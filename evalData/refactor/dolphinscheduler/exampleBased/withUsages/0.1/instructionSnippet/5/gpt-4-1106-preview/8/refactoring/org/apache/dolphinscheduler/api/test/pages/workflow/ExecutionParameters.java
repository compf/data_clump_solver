package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;

public class ExecutionParameters {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;

    public ExecutionParameters(User loginUser, long projectCode, int workflowInstanceId) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
    }

    public User getLoginUser() {
        return loginUser;
    }

    public long getProjectCode() {
        return projectCode;
    }

    public int getWorkflowInstanceId() {
        return workflowInstanceId;
    }
}