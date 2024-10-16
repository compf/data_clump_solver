package org.apache.dolphinscheduler.dao.entity;

import lombok.Data;

import java.util.Date;

@Data
public class WorkflowExecutionQuery {
    private Long workflowDefinitionCode;
    private String searchVal;
    private String executorName;
    private int[] statusArray;
    private String host;
    private Date startTime;
    private Date endTime;
}
