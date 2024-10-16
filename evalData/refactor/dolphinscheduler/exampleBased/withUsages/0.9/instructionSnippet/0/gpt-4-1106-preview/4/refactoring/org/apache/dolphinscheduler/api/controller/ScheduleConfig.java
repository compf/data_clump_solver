package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.common.enums.*;

public class ScheduleConfig {
    private Long workflowDefinitionCode;
    private String schedule;
    private WarningType warningType;
    private Integer warningGroupId;
    private FailureStrategy failureStrategy;
    private Priority workerGroup;

    // Constructor, getters, setters are not shown for brevity
}