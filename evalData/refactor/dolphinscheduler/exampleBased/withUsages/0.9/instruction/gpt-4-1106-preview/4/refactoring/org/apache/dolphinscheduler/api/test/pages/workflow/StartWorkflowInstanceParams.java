package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.dao.entity.User;

public class StartWorkflowInstanceParams {

    private User loginUser;
    private long projectCode;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    public StartWorkflowInstanceParams(User loginUser, long projectCode, long workflowDefinitionCode, String scheduleTime, FailureStrategy failureStrategy, WarningType warningType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.scheduleTime = scheduleTime;
        this.failureStrategy = failureStrategy;
        this.warningType = warningType;
    }

    public User getLoginUser() {
        return loginUser;
    }

    public long getProjectCode() {
        return projectCode;
    }

    public long getWorkflowDefinitionCode() {
        return workflowDefinitionCode;
    }

    public String getScheduleTime() {
        return scheduleTime;
    }

    public FailureStrategy getFailureStrategy() {
        return failureStrategy;
    }

    public WarningType getWarningType() {
        return warningType;
    }
}
