package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterRequest {
    private User loginUser;
    private long projectCode;
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    // getters and setters
}