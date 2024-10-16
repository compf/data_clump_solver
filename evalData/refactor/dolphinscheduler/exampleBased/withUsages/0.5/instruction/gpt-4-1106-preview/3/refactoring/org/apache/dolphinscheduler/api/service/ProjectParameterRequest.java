package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterRequest {
    private User loginUser;
    private long projectCode;
    private long code; // can be used for update or delete
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    // constructor for create and update
    // getters
}