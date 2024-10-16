package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterUpdate {

    private final User loginUser;
    private final long projectCode;
    private final long code;
    private final String projectParameterName;
    private final String projectParameterValue;
    private final String projectParameterDataType;

    public ProjectParameterUpdate(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.code = code;
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    // Getters
}