public class WorkflowInstanceQueryParameters {
    private Long projectCode;
    private Long workflowDefinitionCode;
    private String name;
    private String host;
    private Date startTime;
    private Date endTime;

    public WorkflowInstanceQueryParameters(Long projectCode, Long workflowDefinitionCode, String name, String host, Date startTime, Date endTime) {
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
        this.host = host;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getProjectCode() {
        return projectCode;
    }

    public Long getWorkflowDefinitionCode() {
        return workflowDefinitionCode;
    }

    public String getName() {
        return name;
    }

    public String getHost() {
        return host;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }
}