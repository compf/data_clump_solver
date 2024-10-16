package org.apache.dolphinscheduler.dao.mapper;

import org.apache.dolphinscheduler.common.enums.WorkflowExecutionStatus;

public class WorkflowInstanceUpdateState {
    private Integer workflowInstanceId;
    private WorkflowExecutionStatus originState;
    private WorkflowExecutionStatus targetState;
    // getters and setters
}