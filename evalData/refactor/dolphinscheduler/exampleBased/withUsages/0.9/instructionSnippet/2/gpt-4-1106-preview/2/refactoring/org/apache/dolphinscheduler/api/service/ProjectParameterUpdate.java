package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterUpdate extends ProjectParameterCreation {
    private final long code;

    public ProjectParameterUpdate(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        super(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
        this.code = code;
    }

    public long getCode() {
        return code;
    }

    // Potential additional logic related to updating parameters
}