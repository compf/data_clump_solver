package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterUpdateRequest extends ProjectParameterRequest {
    private long code;

    public ProjectParameterUpdateRequest(User loginUser, long projectCode, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        super(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
    }

    // Getter and setter for code
    public ProjectParameterUpdateRequest withCode(long code) {
        this.code = code;
        return this;
    }
}