
package org.apache.dolphinscheduler.dao.entity;

import java.util.Date;

public class TaskInstanceInitializationParameters {

    private String host;
    private Date startTime;

    public TaskInstanceInitializationParameters(String host, Date startTime) {
        this.host = host;
        this.startTime = startTime;
    }

    public String getHost() {
        return host;
    }

    public Date getStartTime() {
        return startTime;
    }
}
