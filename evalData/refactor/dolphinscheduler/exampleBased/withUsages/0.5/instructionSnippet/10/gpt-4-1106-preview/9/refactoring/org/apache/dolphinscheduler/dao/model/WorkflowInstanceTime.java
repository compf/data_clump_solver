package org.apache.dolphinscheduler.dao.model;

import java.util.Date;

public class WorkflowInstanceTime {

    private Date time;

    public WorkflowInstanceTime(Date time) {
        this.time = time;
    }

    public Date getTime() {
        return time;
    }
}
