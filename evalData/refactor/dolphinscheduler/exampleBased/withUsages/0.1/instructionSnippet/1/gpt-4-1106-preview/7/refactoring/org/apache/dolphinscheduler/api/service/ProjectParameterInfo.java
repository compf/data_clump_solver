package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.plugin.task.api.enums.DataType;

public class ProjectParameterInfo {
    private User loginUser;
    private long projectCode;
    private long code;
    private String projectParameterName;
    private String projectParameterValue;
    private DataType projectParameterDataType;

    // Constructor, getters, and setters
}