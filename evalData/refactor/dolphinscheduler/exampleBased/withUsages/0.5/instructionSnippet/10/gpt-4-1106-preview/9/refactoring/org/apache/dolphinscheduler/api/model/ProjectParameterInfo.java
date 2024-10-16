package org.apache.dolphinscheduler.api.model;

public class ProjectParameterInfo {
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    public ProjectParameterInfo(String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    // Getters and setters
}
