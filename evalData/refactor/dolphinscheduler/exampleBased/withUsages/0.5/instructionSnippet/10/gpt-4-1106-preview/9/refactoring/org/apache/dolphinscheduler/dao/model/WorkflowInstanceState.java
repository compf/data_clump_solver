package org.apache.dolphinscheduler.dao.model;

import org.apache.dolphinscheduler.common.enums.WorkflowExecutionStatus;

public class WorkflowInstanceState {

    private WorkflowExecutionStatus state;

    public WorkflowInstanceState(WorkflowExecutionStatus state) {
        this.state = state;
    }

    public WorkflowExecutionStatus getState() {
        return state;
    }
}
