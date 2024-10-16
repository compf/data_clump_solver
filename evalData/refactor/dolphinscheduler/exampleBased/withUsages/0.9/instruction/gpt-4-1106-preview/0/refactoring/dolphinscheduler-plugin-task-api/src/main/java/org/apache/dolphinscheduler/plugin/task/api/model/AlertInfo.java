package org.apache.dolphinscheduler.plugin.task.api.model;

import lombok.Data;

@Data
public class AlertInfo {
    protected String title;
    protected String content;
    protected Integer alertGroupId;
}
