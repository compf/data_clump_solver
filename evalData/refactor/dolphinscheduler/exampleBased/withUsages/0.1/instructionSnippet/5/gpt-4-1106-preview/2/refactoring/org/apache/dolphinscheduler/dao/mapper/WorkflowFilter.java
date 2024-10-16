package org.apache.dolphinscheduler.dao.mapper;

public class WorkflowFilter {
    private Long projectCode;
    private Long workflowDefinitionCode;
    private String name;
    private String startTime;

    public WorkflowFilter(Long projectCode, Long workflowDefinitionCode, String name, String startTime) {
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
        this.startTime = startTime;
    }

    // Getters and Setters
}