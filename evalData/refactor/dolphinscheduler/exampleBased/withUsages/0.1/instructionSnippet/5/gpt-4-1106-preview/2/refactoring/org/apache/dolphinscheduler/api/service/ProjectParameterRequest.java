package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterRequest {
    private User loginUser;
    private long projectCode;
    private long code;
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    public ProjectParameterRequest(User loginUser, long projectCode, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    public ProjectParameterRequest(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
        this.code = code;
    }

    // Getters and Setters
}