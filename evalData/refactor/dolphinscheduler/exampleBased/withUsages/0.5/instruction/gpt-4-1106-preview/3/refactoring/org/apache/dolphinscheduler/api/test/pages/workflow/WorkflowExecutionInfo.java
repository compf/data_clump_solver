package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.api.enums.ExecuteType;
import org.apache.dolphinscheduler.api.test.entity.HttpResponse;
import org.apache.dolphinscheduler.api.test.utils.RequestClient;
import org.apache.dolphinscheduler.common.enums.FailureStrategy;
import org.apache.dolphinscheduler.common.enums.TaskDependType;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.dao.entity.User;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
public class WorkflowExecutionInfo {

    private User loginUser;
    private long projectCode;
    private long workflowDefinitionCode;
    private String scheduleTime;
    private FailureStrategy failureStrategy;
    private WarningType warningType;

    public Map<String, Object> toParameters() {
        Map<String, Object> params = new HashMap<>();
        params.put("loginUser", loginUser);
        params.put("workflowDefinitionCode", workflowDefinitionCode);
        params.put("scheduleTime", scheduleTime);
        params.put("failureStrategy", failureStrategy);
        params.put("warningType", warningType);
        return params;
    }

    public long getProjectCode() {
        return projectCode;
    }
}