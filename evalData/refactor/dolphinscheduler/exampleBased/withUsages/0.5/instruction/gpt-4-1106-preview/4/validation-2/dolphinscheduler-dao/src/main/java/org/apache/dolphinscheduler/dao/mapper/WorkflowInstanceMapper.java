public class WorkflowInstanceQuery {

    private Long workflowDefinitionCode;
    private String searchVal;
    private String executorName;
    private int[] statusArray;
    private String host;
    private Date startTime;
    private Date endTime;

    // getters and setters
}

public class FailoverStateQuery {

    private String host;
    private int[] stateArray;

    // getters and setters
}

public class WorkflowInstanceUpdateState {

    private Integer workflowInstanceId;
    private WorkflowExecutionStatus originState;
    private WorkflowExecutionStatus targetState;

    // getters and setters
}

public class TenantCodeUpdate {

    private String originTenantCode;
    private String destTenantCode;

    // getters and setters
}

public class WorkerGroupNameUpdate {

    private String originWorkerGroupName;
    private String destWorkerGroupName;

    // getters and setters
}

public class WorkflowInstanceCountQuery {

    private Date startTime;
    private Date endTime;
    private Collection<Long> projectCodes;

    // getters and setters
}

public class WorkflowInstanceTopQuery {

    private int size;
    private Date startTime;
    private Date endTime;
    private WorkflowExecutionStatus status;
    private long projectCode;

    // getters and setters
}