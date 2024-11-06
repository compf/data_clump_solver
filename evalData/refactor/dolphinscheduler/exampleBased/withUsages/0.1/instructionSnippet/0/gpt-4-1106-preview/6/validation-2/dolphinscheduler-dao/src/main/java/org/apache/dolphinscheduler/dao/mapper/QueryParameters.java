package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;

public class QueryParameters {
    private Long projectCode;
    private Long workflowDefinitionCode;
    private Date startTime;
    private Date endTime;
    private Integer state;

    public QueryParameters(Long projectCode, Long workflowDefinitionCode, Date startTime, Date endTime, Integer state) {
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.state = state;
    }

    // Getters and setters
}