package org.apache.dolphinscheduler.dao.entity;

import java.util.Date;

public class TaskInstanceInitialData {
    private final String host;
    private final Date startTime;
    private final String executePath;

    public TaskInstanceInitialData(String host, Date startTime, String executePath) {
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