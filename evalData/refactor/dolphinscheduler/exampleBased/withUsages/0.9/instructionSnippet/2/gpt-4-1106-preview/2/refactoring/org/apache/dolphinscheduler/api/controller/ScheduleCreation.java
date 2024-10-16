package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.common.enums.*;
import java.util.Map;

public class ScheduleCreation {
    private final User loginUser;
    // Other fields

    public ScheduleCreation(User loginUser, long projectCode, long workflowDefinitionCode, String schedule, WarningType warningType, int warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup, String tenantCode, Long environmentCode) {
        this.loginUser = loginUser;
        // Initialize other fields
    }

    // Getters and potential additional logic related to schedule creation
}