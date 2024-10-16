public class ProjectParameterUpdateRequest extends ProjectParameterRequest {
    private long code;

    public ProjectParameterUpdateRequest(User loginUser, long projectCode, long code, String projectParameterName, String projectParameterValue, String projectParameterDataType) {
        super(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
        this.code = code;
    }

    // Getters and potential additional methods omitted for brevity
}