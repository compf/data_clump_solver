package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.dao.entity.User;

public class ScheduleRequest {
    private User loginUser;
    private long projectCode;
    private long workflowDefinitionCode;
    private String schedule;
    private String warningType;
    private int warningGroupId;
    private String failureStrategy;
    private String workflowInstancePriority;
    private String workerGroup;
    private String tenantCode;
    private Long environmentCode;

    // constructor, getters and setters
}
