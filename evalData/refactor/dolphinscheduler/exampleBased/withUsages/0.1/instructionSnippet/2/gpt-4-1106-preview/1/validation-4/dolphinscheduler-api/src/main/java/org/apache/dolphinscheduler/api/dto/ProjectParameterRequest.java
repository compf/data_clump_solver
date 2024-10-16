package org.apache.dolphinscheduler.api.dto;

import lombok.Data;

@Data
public class ProjectParameterRequest {

    private long projectCode;
    private long code;
    private String parameterName;
    private String parameterValue;
    private String parameterDataType;

    // Constructor, getters, and setters
}