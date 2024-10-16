package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.Priority;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.dao.entity.User;

public class ScheduleUpdateRequest {
    private User loginUser;
    private long projectCode;
    // Other fields and methods
    public void setEnvironmentCode(long environmentCode) {
        // Set the environment code
    }
    public void setWorkflowInstancePriority(Priority workflowInstancePriority) {
        // Set the workflow instance priority
    }
}