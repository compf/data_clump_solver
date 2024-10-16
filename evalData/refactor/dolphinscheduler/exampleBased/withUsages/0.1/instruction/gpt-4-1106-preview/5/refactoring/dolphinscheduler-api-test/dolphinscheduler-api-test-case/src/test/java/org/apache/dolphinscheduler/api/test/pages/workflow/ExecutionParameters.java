package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.dao.entity.User;

public class ExecutionParameters {

    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    // Getters and Setters

    public User getLoginUser() {
        return loginUser;
    }

    public void setLoginUser(User loginUser) {
        this.loginUser = loginUser;
    }

    public long getWorkflowDefinitionCode() {
        return workflowDefinitionCode;
    }

    public void setWorkflowDefinitionCode(long workflowDefinitionCode) {
        this.workflowDefinitionCode = workflowDefinitionCode;
    }

    public String getScheduleTime() {
        return scheduleTime;
    }

    public void setScheduleTime(String scheduleTime) {
        this.scheduleTime = scheduleTime;
    }

    public FailureStrategy getFailureStrategy() {
        return failureStrategy;
    }

    public void setFailureStrategy(FailureStrategy failureStrategy) {
        this.failureStrategy = failureStrategy;
    }

    public WarningType getWarningType() {
        return warningType;
    }

    public void setWarningType(WarningType warningType) {
        this.warningType = warningType;
    }
}