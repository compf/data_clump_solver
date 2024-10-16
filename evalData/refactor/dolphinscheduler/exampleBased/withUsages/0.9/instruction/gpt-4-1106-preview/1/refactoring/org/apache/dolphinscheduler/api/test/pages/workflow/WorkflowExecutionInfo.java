package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.WarningType;

public class WorkflowExecutionInfo {

    private User loginUser;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    // getters and setters
}