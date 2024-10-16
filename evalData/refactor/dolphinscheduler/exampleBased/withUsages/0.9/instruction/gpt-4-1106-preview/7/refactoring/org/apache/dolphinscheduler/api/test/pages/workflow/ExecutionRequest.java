package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.api.test.entity.User;
import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.TaskDependType;
import org.apache.dolphinscheduler.common.enums.WarningType;

import java.util.HashMap;
import java.util.Map;

public class ExecutionRequest {

    private final User loginUser;
    private final Long workflowDefinitionCode;
    private final String scheduleTime;
    private final FailureStrategy failureStrategy;
    private final WarningType warningType;
    private final String startNodeList;
    private final Integer workflowInstanceId;
    private final TaskDependType taskDependType;

    public ExecutionRequest(User loginUser,
                           Long workflowDefinitionCode,
                           String scheduleTime,
                           FailureStrategy failureStrategy,
                           WarningType warningType,
                           String startNodeList,
                           Integer workflowInstanceId,
                           TaskDependType taskDependType) {
        this.loginUser = loginUser;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.scheduleTime = scheduleTime;
        this.failureStrategy = failureStrategy;
        this.warningType = warningType;
        this.startNodeList = startNodeList;
        this.workflowInstanceId = workflowInstanceId;
        this.taskDependType = taskDependType;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("loginUser", loginUser);
        if (workflowDefinitionCode != null) {
            params.put("workflowDefinitionCode", workflowDefinitionCode);
        }
        if (scheduleTime != null) {
            params.put("scheduleTime", scheduleTime);
        }
        if (failureStrategy != null) {
            params.put("failureStrategy", failureStrategy);
        }
        if (warningType != null) {
            params.put("warningType", warningType);
        }
        if (startNodeList != null) {
            params.put("startNodeList", startNodeList);
        }
        if (workflowInstanceId != null) {
            params.put("workflowInstanceId", workflowInstanceId);
        }
        if (taskDependType != null) {
            params.put("taskDependType", taskDependType);
        }
        return params;
    }
}