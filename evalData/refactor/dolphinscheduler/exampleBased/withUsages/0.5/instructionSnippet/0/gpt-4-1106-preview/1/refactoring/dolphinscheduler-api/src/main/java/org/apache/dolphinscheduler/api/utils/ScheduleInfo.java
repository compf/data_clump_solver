package org.apache.dolphinscheduler.api.utils;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.Priority;
import org.apache.dolphinscheduler.common.enums.WarningType;

public class ScheduleInfo {
    private String schedule;
    private WarningType warningType;
    private Integer warningGroupId;
    private FailureStrategy failureStrategy;
    private Priority workflowInstancePriority;
    private String workerGroup;

    public ScheduleInfo(String schedule, WarningType warningType, Integer warningGroupId, FailureStrategy failureStrategy, Priority workflowInstancePriority, String workerGroup) {
        this.schedule = schedule;
        this.warningType = warningType;
        this.warningGroupId = warningGroupId;
        this.failureStrategy = failureStrategy;
        this.workflowInstancePriority = workflowInstancePriority;
        this.workerGroup = workerGroup;
    }

    // Getters and Setters
}