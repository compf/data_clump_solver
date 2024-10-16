public class ProjectParameterUpdateRequest extends ProjectParameterRequest {
    private long code; // Additional field for update

    public ProjectParameterUpdateRequest(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, DataType projectParameterDataType) {
        super(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
        this.code = code;
    }

    public long getCode() {
        return code;
    }
}