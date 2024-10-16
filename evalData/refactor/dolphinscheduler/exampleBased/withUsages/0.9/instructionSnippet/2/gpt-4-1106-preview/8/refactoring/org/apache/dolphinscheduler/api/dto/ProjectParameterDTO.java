package org.apache.dolphinscheduler.api.dto;

public class ProjectParameterDTO {

    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    public ProjectParameterDTO(String projectParameterName, String projectParameterValue, String projectParameterDataType) {
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

    // Include additional methods such as validation or conversion logic if applicable
}
