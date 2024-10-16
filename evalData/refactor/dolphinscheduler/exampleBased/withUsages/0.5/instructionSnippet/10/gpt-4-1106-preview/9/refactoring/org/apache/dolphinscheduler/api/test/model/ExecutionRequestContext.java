package org.apache.dolphinscheduler.api.test.model;

import org.apache.dolphinscheduler.dao.entity.User;

import java.util.HashMap;
import java.util.Map;

public class ExecutionRequestContext {

    private User loginUser;
    private long projectCode;
    private int workflowInstanceId;

    public ExecutionRequestContext(User loginUser, long projectCode, int workflowInstanceId) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.workflowInstanceId = workflowInstanceId;
    }

    public Map<String, Object> createParamsMap() {
        Map<String, Object> params = new HashMap<>();
        params.put("loginUser", loginUser);
        params.put("projectCode", projectCode);
        params.put("workflowInstanceId", workflowInstanceId);
        return params;
    }

    public Map<String, String> createHeadersMap(String sessionId) {
        Map<String, String> headers = new HashMap<>();
        headers.put(Constants.SESSION_ID_KEY, sessionId);
        return headers;
    }

    public long getProjectCode() {
        return projectCode;
    }
}
