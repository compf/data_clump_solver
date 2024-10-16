package org.apache.dolphinscheduler.api.dto;

import lombok.Data;

@Data
public class ProjectParameterUpdateRequest {
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;
}
