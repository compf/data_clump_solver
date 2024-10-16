package org.apache.dolphinscheduler.api.test.entity;

import org.apache.dolphinscheduler.common.enums.TaskDependType;

import java.util.HashMap;
import java.util.Map;

public class TaskExecutionParameters {

    private User loginUser;
    private String startNodeList;
    private TaskDependType taskDependType;

    public Map<String, Object> toMap() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("loginUser", loginUser);
        parameters.put("startNodeList", startNodeList);
        parameters.put("taskDependType", taskDependType);
        return parameters;
    }

    // Getters and Setters
}