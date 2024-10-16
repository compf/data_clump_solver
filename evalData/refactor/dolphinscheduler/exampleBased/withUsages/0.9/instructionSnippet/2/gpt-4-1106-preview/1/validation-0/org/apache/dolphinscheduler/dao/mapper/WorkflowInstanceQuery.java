
package org.apache.dolphinscheduler.dao.mapper;

import java.util.Date;

public class WorkflowInstanceQuery {

    private Long projectCode;
    private Date startTime;
    private Date endTime;
    private String searchVal;

    public WorkflowInstanceQuery(Long projectCode, Date startTime, Date endTime, String searchVal) {
        this.projectCode = projectCode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.searchVal = searchVal;
    }

    public Long getProjectCode() {
        return projectCode;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public String getSearchVal() {
        return searchVal;
    }
}
