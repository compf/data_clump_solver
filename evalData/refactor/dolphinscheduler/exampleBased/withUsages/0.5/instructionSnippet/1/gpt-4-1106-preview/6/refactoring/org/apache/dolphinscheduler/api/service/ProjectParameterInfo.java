package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;

public class ProjectParameterInfo {

    private User loginUser;
    private long projectCode;
    private long code; // for update
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    // Constructor, getters and setters
}