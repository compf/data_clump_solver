package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.common.enums.*;

public class SchedulerData {

    private long projectCode;
    private long workflowDefinitionCode;
    private String schedule;
    private WarningType warningType;
    private int warningGroupId;
    private FailureStrategy failureStrategy;
    private Priority workflowInstancePriority;
    private String workerGroup;
    private String tenantCode;

    // Constructor, getters, and additional methods for functionality
}