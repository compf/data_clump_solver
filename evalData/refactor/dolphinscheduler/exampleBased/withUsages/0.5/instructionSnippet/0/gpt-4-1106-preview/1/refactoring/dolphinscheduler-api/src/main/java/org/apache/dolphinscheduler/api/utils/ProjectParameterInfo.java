package org.apache.dolphinscheduler.api.utils;

public class ProjectParameterInfo {
    private String name;
    private String value;
    private String description;
    private String dataType;

    public ProjectParameterInfo(String name, String value, String description, String dataType) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.dataType = dataType;
    }

    // Getters and Setters
}