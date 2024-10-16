package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.common.enums.TaskDependType;
import org.apache.dolphinscheduler.dao.entity.User;

public class TaskExecutionRequest {
    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;
    private String startNodeList;
    private TaskDependType taskDependType;

    // Constructor, getters, and setters
}