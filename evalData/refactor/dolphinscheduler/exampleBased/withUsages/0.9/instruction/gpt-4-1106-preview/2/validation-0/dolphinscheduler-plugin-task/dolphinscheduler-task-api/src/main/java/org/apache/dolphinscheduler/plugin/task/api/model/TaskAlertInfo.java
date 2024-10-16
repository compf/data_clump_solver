package org.apache.dolphinscheduler.plugin.task.api.model;

public class TaskAlertInfo {

    private String title;

    private String content;

    private Integer alertGroupId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getAlertGroupId() {
        return alertGroupId;
    }

    public void setAlertGroupId(Integer alertGroupId) {
        this.alertGroupId = alertGroupId;
    }
}