package org.apache.dolphinscheduler.api.test.entity;

import lombok.Data;

@Data
public class ExecutionParameter {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;
}