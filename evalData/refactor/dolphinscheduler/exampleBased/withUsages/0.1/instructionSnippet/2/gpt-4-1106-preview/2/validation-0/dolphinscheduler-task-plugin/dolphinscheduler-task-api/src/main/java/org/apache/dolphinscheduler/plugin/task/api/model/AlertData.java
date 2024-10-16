package org.apache.dolphinscheduler.plugin.task.api.model;

public class AlertData {
    private String title;
    private String content;
    private Integer alertGroupId;

    public AlertData(String title, String content, Integer alertGroupId) {
        this.title = title;
        this.content = content;
        this.alertGroupId = alertGroupId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Integer getAlertGroupId() {
        return alertGroupId;
    }
}