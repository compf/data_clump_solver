package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;
import java.util.Set;

public class InstanceQueryParams {
    private Date startTime;
    private Date endTime;
    private Long projectCode;
    private Long workflowCode;
    private Integer model;
    private Set<Integer> projectIds;

    // Constructor, getters, and setters
}