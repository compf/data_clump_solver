package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterRequest {
    private User loginUser;
    private long projectCode;
    private long code;
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    // Constructor, Getters and Setters
}