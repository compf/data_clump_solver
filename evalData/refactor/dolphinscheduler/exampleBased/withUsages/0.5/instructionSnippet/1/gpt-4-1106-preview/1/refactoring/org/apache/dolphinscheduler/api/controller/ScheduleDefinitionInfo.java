package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.Priority;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.dao.entity.User;

public class ScheduleDefinitionInfo {
    private final User loginUser;
    private final long projectCode;
    private final long workflowDefinitionCode;
    private final String schedule;
    private final WarningType warningType;
    private final Integer warningGroupId;
    private final FailureStrategy failureStrategy;
    private final Priority workflowInstancePriority;
    private final String workerGroup;
    private final String tenantCode;

    public ScheduleDefinitionInfo(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, Integer warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.schedule = schedule;
        this.warningType = warningType;
        this.warningGroupId = warningGroupId;
        this.failureStrategy = failureStrategy;
        this.workflowInstancePriority = workflowInstancePriority;
        this.workerGroup = workerGroup;
        this.tenantCode = tenantCode;
    }

    // Getters and additional methods
}