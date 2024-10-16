package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;

public class WorkflowInstanceQueryCondition {

    private Long projectCode;
    private Long workflowDefinitionCode;
    private String searchVal;
    private String executorName;
    private int[] statusArray;
    private String host;
    private Date startTime;
    private Date endTime;

    // getters and setters
}