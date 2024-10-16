package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;
import org.apache.dolphinscheduler.common.enums.WorkflowExecutionStatus;

public class QueryTopNWorkflowInstanceParameter {

    private int size;
    private Date startTime;
    private Date endTime;
    private WorkflowExecutionStatus status;

    // Getters and Setters
}