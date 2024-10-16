package org.apache.dolphinscheduler.api.dto;

import lombok.Data;

@Data
public class ProjectParameterRequest {
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;
}
