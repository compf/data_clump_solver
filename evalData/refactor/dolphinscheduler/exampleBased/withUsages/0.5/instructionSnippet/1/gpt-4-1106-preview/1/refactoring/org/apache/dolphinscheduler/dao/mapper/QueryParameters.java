package org.apache.dolphinscheduler.dao.mapper;

public class QueryParameters {
    private final long workflowDefinitionCode;
    private final String name;
    private final String host;

    public QueryParameters(long workflowDefinitionCode, String name, String host) {
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
        this.host = host;
    }

    // Getters and additional methods
}