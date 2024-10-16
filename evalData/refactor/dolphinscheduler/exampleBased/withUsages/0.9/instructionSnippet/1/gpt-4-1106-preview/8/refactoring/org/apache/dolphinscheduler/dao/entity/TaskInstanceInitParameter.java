package org.apache.dolphinscheduler.dao.entity;

import java.util.Date;

public class TaskInstanceInitParameter {

    private final String host;
    private final Date startTime;
    private final String executePath;

    public TaskInstanceInitParameter(String host, Date startTime, String executePath) {
        this.host = host;
        this.startTime = startTime;
        this.executePath = executePath;
    }

    // Getters
}