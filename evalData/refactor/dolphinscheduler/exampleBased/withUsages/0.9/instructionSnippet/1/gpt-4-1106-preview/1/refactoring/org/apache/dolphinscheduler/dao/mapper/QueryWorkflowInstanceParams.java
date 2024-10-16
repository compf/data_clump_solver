public class QueryWorkflowInstanceParams {
    private Page<WorkflowInstance> page;
    private long workflowDefinitionCode;
    private String name;
    private String host;

    public QueryWorkflowInstanceParams(Page<WorkflowInstance> page, long workflowDefinitionCode, String name, String host) {
        this.page = page;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
        this.host = host;
    }

    // Getters and potential additional methods omitted for brevity
}