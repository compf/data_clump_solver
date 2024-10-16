package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.common.enums.TaskDependType;

public class ExecutionTaskParameters {
    private final User loginUser;
    private final long projectCode;
    private final int workflowInstanceId;
    private final String startNodeList;
    private final TaskDependType taskDependType;

    public ExecutionTaskParameters(User loginUser, long projectCode, int workflowInstanceId, String startNodeList, TaskDependType taskDependType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.startNodeList = startNodeList;
        this.taskDependType = taskDependType;
    }

    // Getters and potential additional logic related to these parameters
}