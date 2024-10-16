public class ProjectParameterCreateRequest extends ProjectParameterRequest {
    public ProjectParameterCreateRequest(User loginUser, long projectCode, String projectParameterName, String projectParameterValue, DataType projectParameterDataType) {
        super(loginUser, projectCode, projectParameterName, projectParameterValue, projectParameterDataType);
    }
}