package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.plugin.task.api.enums.DataType;

public class ProjectParameterCreationParameters {

    private User loginUser;
    private long projectCode;
    private String projectParameterName;
    private String projectParameterValue;
    private String projectParameterDataType;

    // Constructors, getters, setters, and potentially other methods
}