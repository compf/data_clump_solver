package org.apache.dolphinscheduler.plugin.task.api.model;

public class AlertInfo {

    private String title;
    private String content;
    private Integer alertGroupId;

    public AlertInfo(String title, String content, Integer alertGroupId) {
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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAlertGroupId(Integer alertGroupId) {
        this.alertGroupId = alertGroupId;
    }
}