package org.apache.dolphinscheduler.dao.entity;

import org.apache.dolphinscheduler.plugin.task.api.enums.TaskExecutionStatus;

import java.util.Date;

public class TaskExecutionInfo {

    private TaskExecutionStatus state;
    private Date firstSubmitTime;
    private Date submitTime;
    private Date startTime;
    private Date endTime;
    private String host;
    private String executePath;
    private String logPath;
    private int retryTimes;
    private Flag alertFlag;

    public TaskExecutionInfo(TaskExecutionStatus state, Date firstSubmitTime, Date submitTime, Date startTime, Date endTime, String host, String executePath, String logPath, int retryTimes, Flag alertFlag) {
        this.state = state;
        this.firstSubmitTime = firstSubmitTime;
        this.submitTime = submitTime;
        this.startTime = startTime;
        this.endTime = endTime;
        this.host = host;
        this.executePath = executePath;
        this.logPath = logPath;
        this.retryTimes = retryTimes;
        this.alertFlag = alertFlag;
    }

    // Getters and setters
}
