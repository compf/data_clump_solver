package org.apache.dolphinscheduler.api.test.pages.workflow;

import org.apache.dolphinscheduler.common.enums.TaskDependType;

public class TaskExecutionRequest {
    private int workflowInstanceId;
    private String startNodeList;
    private TaskDependType taskDependType;

    // Getters and setters
    public int getWorkflowInstanceId() { return workflowInstanceId; }

    public void setWorkflowInstanceId(int workflowInstanceId) { this.workflowInstanceId = workflowInstanceId; }

    public String getStartNodeList() { return startNodeList; }

    public void setStartNodeList(String startNodeList) { this.startNodeList = startNodeList; }

    public TaskDependType getTaskDependType() { return taskDependType; }

    public void setTaskDependType(TaskDependType taskDependType) { this.taskDependType = taskDependType; }
}