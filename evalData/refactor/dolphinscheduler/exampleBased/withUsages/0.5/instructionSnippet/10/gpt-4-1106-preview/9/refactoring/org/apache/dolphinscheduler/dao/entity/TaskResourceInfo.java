package org.apache.dolphinscheduler.dao.entity;

import org.apache.dolphinscheduler.common.enums.TaskExecuteType;

public class TaskResourceInfo {

    private int taskGroupId;
    private Integer cpuQuota;
    private Integer memoryMax;
    private TaskExecuteType taskExecuteType;

    public TaskResourceInfo(int taskGroupId, Integer cpuQuota, Integer memoryMax, TaskExecuteType taskExecuteType) {
        this.taskGroupId = taskGroupId;
        this.cpuQuota = cpuQuota;
        this.memoryMax = memoryMax;
        this.taskExecuteType = taskExecuteType;
    }

    // Getters and setters
}
