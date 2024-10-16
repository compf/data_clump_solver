package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterCreation {

    private final User loginUser;
    private final long projectCode;
    private final String projectParameterName;
    private final String projectParameterValue;
    private final String projectParameterDataType;

    public ProjectParameterCreation(User loginUser, long projectCode, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    // Getters
}