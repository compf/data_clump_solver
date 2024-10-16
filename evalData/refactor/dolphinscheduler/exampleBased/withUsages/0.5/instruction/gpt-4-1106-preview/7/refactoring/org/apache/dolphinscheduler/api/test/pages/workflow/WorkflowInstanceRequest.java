package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.WarningType;

public class WorkflowInstanceRequest {
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;
    // getters and setters
}