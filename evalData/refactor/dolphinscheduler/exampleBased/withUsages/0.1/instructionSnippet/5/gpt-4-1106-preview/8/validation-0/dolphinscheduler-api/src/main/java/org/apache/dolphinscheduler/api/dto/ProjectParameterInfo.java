package org.apache.dolphinscheduler.api.dto;

public class ProjectParameterInfo {

    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    public ProjectParameterInfo(String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    public String getProjectParameterName() {
        return projectParameterName;
    }

    public String getProjectParameterValue() {
        return projectParameterValue;
    }

    public String getProjectParameterDataType() {
        return projectParameterDataType;
    }
}
