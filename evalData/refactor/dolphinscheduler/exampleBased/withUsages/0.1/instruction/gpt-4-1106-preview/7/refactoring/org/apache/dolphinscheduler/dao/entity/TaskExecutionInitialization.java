package org.apache.dolphinscheduler.dao.entity;

import java.util.Date;

public class TaskExecutionInitialization {
    private String host;
    private Date startTime;
    private String executePath;

    public TaskExecutionInitialization(String host, Date startTime, String executePath) {
        this.host = host;
        this.startTime = startTime;
        this.executePath = executePath;
    }

    public String getHost() {
        return host;
    }

    public Date getStartTime() {
        return startTime;
    }

    public String getExecutePath() {
        return executePath;
    }
}
