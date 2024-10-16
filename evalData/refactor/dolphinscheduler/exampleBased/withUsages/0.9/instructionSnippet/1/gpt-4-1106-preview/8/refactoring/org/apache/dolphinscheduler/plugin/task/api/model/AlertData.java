package org.apache.dolphinscheduler.plugin.task.api.model;

public class AlertData {

    private final String title;
    private final String content;
    private final Integer alertGroupId;

    public AlertData(String title, String content, Integer alertGroupId) {
        this.title = title;
        this.content = content;
        this.alertGroupId = alertGroupId;
    }

    // Getters
}