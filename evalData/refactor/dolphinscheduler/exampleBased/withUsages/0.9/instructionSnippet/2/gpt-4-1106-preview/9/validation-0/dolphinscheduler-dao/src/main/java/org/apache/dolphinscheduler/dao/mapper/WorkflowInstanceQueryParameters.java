public class WorkflowInstanceQueryParameters {
    private final Long projectCode;
    private final Long workflowDefinitionCode;
    private final String name;

    public WorkflowInstanceQueryParameters(Long projectCode, Long workflowDefinitionCode, String name) {
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
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
}