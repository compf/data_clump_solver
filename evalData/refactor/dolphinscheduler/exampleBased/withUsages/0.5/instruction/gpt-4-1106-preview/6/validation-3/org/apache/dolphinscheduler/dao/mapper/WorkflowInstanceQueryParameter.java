package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;

public class WorkflowInstanceQueryParameter {

    private Long projectCode;
    private Long workflowDefinitionCode;
    private String searchVal;
    private String executorName;
    private int[] statusArray;
    private String host;
    private Date startTime;
    private Date endTime;

    // getters and setters for all fields, constructor
}