package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;
import java.util.Set;

public class QueryParameters {
    private Date startTime;
    private Date endTime;
    private Long projectCode;
    private Long workflowCode;
    private Integer model;
    private Set<Integer> projectIds;

    public QueryParameters(Date startTime, Date endTime, Long projectCode, Long workflowCode, Integer model, Set<Integer> projectIds) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.projectCode = projectCode;
        this.workflowCode = workflowCode;
        this.model = model;
        this.projectIds = projectIds;
    }

    // Getters and setters
}