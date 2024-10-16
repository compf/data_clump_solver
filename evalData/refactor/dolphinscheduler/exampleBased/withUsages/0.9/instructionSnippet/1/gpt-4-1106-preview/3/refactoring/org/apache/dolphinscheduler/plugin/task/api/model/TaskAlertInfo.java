package org.apache.dolphinscheduler.plugin.task.api.model;

public class TaskAlertInfo {

    private String title;
    private String content;
    private Integer alertGroupId;

    public TaskAlertInfo(String title, String content, Integer alertGroupId) {
        this.title = title;
        this.content = content;
        this.alertGroupId = alertGroupId;
    }

    // Getters...
}
