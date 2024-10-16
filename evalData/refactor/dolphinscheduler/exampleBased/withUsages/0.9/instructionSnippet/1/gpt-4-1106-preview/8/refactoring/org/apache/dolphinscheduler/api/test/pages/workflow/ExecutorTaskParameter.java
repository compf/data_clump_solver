package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.dao.entity.User;

public class ExecutorTaskParameter {

    private final User loginUser;
    private final long projectCode;
    private final int workflowInstanceId;
    private final String startNodeList;

    public ExecutorTaskParameter(User loginUser, long projectCode, int workflowInstanceId, String startNodeList) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
        this.startNodeList = startNodeList;
    }

    // Getters
}