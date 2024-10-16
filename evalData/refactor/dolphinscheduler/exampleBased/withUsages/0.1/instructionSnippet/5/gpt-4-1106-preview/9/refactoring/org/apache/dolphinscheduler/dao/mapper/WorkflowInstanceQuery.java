public class WorkflowInstanceQuery {
    private Long projectCode;
    private Long workflowDefinitionCode;
    private String name;
    private String startTime;
    private String endTime;

    public WorkflowInstanceQuery(Long projectCode, Long workflowDefinitionCode, String name, String startTime, String endTime) {
        this.projectCode = projectCode;
        this.workflowDefinitionCode = workflowDefinitionCode;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and setters
}