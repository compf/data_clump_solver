public class ProjectParameterRequest {
    private User loginUser;
    private long projectCode;
    private long code; // This represents the project parameter code
    private String projectParameterName;
    private String projectParameterValue;
    private DataType projectParameterDataType;

    public ProjectParameterRequest(User loginUser, long projectCode, String projectParameterName, String projectParameterValue, DataType projectParameterDataType) {
        this(loginUser, projectCode, 0, projectParameterName, projectParameterValue, projectParameterDataType);
    }

    public ProjectParameterRequest(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, DataType projectParameterDataType) {
        this.loginUser = loginUser;
        this.projectCode = projectCode;
        this.code = code;
        this.projectParameterName = projectParameterName;
        this.projectParameterValue = projectParameterValue;
        this.projectParameterDataType = projectParameterDataType;
    }

    // getters and setters
}