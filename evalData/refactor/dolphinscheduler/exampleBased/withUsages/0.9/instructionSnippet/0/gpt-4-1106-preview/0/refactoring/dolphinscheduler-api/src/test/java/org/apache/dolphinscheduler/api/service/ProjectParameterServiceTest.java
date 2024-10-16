/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
No changes, the refactoring task is not clear enough to perform an action.
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ProjectParameterServiceTest {

    @InjectMocks
    private ProjectParameterServiceImpl projectParameterService;

    @Mock
    private ProjectMapper projectMapper;

    @Mock
    private ProjectParameterMapper projectParameterMapper;

    @Mock
    private ProjectServiceImpl projectService;

    protected final static long projectCode = 1L;

    @Test
    public void testCreateProjectParameter() {
        User loginUser = getGeneralUser();

        // PERMISSION DENIED
        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
No changes, the refactoring task is not clear enough to perform an action.
        Result result = projectParameterService.createProjectParameter(loginUser, projectCode, "key", "value",
                DataType.VARCHAR.name());
        assertNull(result.getData());
        assertNull(result.getCode());
        assertNull(result.getMsg());

        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
                .thenReturn(true);

        // CODE GENERATION ERROR
        try (MockedStatic<CodeGenerateUtils> ignored = Mockito.mockStatic(CodeGenerateUtils.class)) {
            when(CodeGenerateUtils.genCode()).thenThrow(CodeGenerateUtils.CodeGenerateException.class);

            result = projectParameterService.createProjectParameter(loginUser, projectCode, "key", "value",
                    DataType.VARCHAR.name());
            assertEquals(Status.CREATE_PROJECT_PARAMETER_ERROR.getCode(), result.getCode());
        }

        // PROJECT_PARAMETER_ALREADY_EXISTS
        when(projectMapper.queryByCode(projectCode)).thenReturn(getProject(projectCode));
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.createProjectParameter(loginUser, projectCode, "key", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.PROJECT_PARAMETER_ALREADY_EXISTS.getCode(), result.getCode());

        // INSERT DATA ERROR
        when(projectParameterMapper.selectOne(Mockito.any())).thenReturn(null);
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.createProjectParameter(loginUser, projectCode, "key1", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.CREATE_PROJECT_PARAMETER_ERROR.getCode(), result.getCode());

        // SUCCESS
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.createProjectParameter(loginUser, projectCode, "key1", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testUpdateProjectParameter() {
        User loginUser = getGeneralUser();

        // NO PERMISSION
        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
No changes, the refactoring task is not clear enough to perform an action.
        Result result = projectParameterService.updateProjectParameter(loginUser, projectCode, 1, "key", "value",
                DataType.VARCHAR.name());
        assertNull(result.getData());
        assertNull(result.getCode());
        assertNull(result.getMsg());
No changes, the refactoring task is not clear enough to perform an action.
        // PROJECT_PARAMETER_NOT_EXISTS
        when(projectMapper.queryByCode(projectCode)).thenReturn(getProject(projectCode));
        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
                .thenReturn(true);
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.updateProjectParameter(loginUser, projectCode, 1, "key", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.PROJECT_PARAMETER_NOT_EXISTS.getCode(), result.getCode());

        // PROJECT_PARAMETER_ALREADY_EXISTS
        when(projectParameterMapper.queryByCode(Mockito.anyLong())).thenReturn(getProjectParameter());
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.updateProjectParameter(loginUser, projectCode, 1, "key", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.PROJECT_PARAMETER_ALREADY_EXISTS.getCode(), result.getCode());

        // PROJECT_UPDATE_ERROR
        when(projectParameterMapper.selectOne(Mockito.any())).thenReturn(null);
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.updateProjectParameter(loginUser, projectCode, 1, "key1", "value",
                DataType.VARCHAR.name());
        assertEquals(Status.UPDATE_PROJECT_PARAMETER_ERROR.getCode(), result.getCode());

        // SUCCESS
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.updateProjectParameter(loginUser, projectCode, 1, "key1", "value",
                DataType.LONG.name());
        assertEquals(Status.SUCCESS.getCode(), result.getCode());
        ProjectParameter projectParameter = (ProjectParameter) result.getData();
        assertNotNull(projectParameter.getOperator());
        assertNotNull(projectParameter.getUpdateTime());
        assertEquals(DataType.LONG.name(), projectParameter.getParamDataType());
    }

    @Test
    public void testDeleteProjectParametersByCode() {
        User loginUser = getGeneralUser();

        // NO PERMISSION
        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
No changes, the refactoring task is not clear enough to perform an action.
        Result result = projectParameterService.deleteProjectParametersByCode(loginUser, projectCode, 1);
        assertNull(result.getData());
        assertNull(result.getCode());
        assertNull(result.getMsg());

        // PROJECT_PARAMETER_NOT_EXISTS
        when(projectMapper.queryByCode(projectCode)).thenReturn(getProject(projectCode));
        when(projectService.hasProjectAndWritePerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class)))
                .thenReturn(true);
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.deleteProjectParametersByCode(loginUser, projectCode, 1);
        assertEquals(Status.PROJECT_PARAMETER_NOT_EXISTS.getCode(), result.getCode());

        // DATABASE OPERATION ERROR
        when(projectParameterMapper.queryByCode(Mockito.anyLong())).thenReturn(getProjectParameter());
        when(projectParameterMapper.deleteById(Mockito.anyInt())).thenReturn(-1);
        result = projectParameterService.deleteProjectParametersByCode(loginUser, projectCode, 1);
        assertEquals(Status.DELETE_PROJECT_PARAMETER_ERROR.getCode(), result.getCode());

        // SUCCESS
        when(projectParameterMapper.deleteById(Mockito.anyInt())).thenReturn(1);
        result = projectParameterService.deleteProjectParametersByCode(loginUser, projectCode, 1);
        assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testQueryProjectParameterByCode() {
        User loginUser = getGeneralUser();

        // NO PERMISSION
        when(projectService.hasProjectAndPerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class),
                Mockito.any()))
        No changes, the refactoring task is not clear enough to perform an action.

        Result result = projectParameterService.queryProjectParameterByCode(loginUser, projectCode, 1);
        assertNull(result.getData());
        assertNull(result.getCode());
        assertNull(result.getMsg());

        // PROJECT_PARAMETER_NOT_EXISTS
        when(projectMapper.queryByCode(projectCode)).thenReturn(getProject(projectCode));
        when(projectService.hasProjectAndPerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class),
                Mockito.any())).thenReturn(true);
No changes, the refactoring task is not clear enough to perform an action.
        result = projectParameterService.queryProjectParameterByCode(loginUser, projectCode, 1);
        assertEquals(Status.PROJECT_PARAMETER_NOT_EXISTS.getCode(), result.getCode());

        // SUCCESS
        when(projectParameterMapper.queryByCode(Mockito.anyLong())).thenReturn(getProjectParameter());
        result = projectParameterService.queryProjectParameterByCode(loginUser, projectCode, 1);
        assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testQueryProjectParameterListPaging() {
        User loginUser = getGeneralUser();
        Integer pageSize = 10;
        Integer pageNo = 1;

        // NO PERMISSION
        when(projectService.hasProjectAndPerm(Mockito.any(), Mockito.any(), Mockito.any(Result.class),
                Mockito.any()))
        No changes, the refactoring task is not clear enough to perform an action.

        Result result =
                projectParameterService.queryProjectParameterListPaging(loginUser, projectCode, pageSize, pageNo, null,
                        DataType.VARCHAR.name());
        assertNull(result.getData());
        assertNull(result.getCode());
        assertNull(result.getMsg());

        // SUCCESS
        when(projectService.hasProjectAndPerm(any(), any(), any(Result.class), any()))
                .thenReturn(true);

        Page<ProjectParameter> page = new Page<>(pageNo, pageSize);
        page.setRecords(Collections.singletonList(getProjectParameter()));

        when(projectParameterMapper.queryProjectParameterListPaging(any(), anyLong(), any(), any(), any()))
                .thenReturn(page);
        result = projectParameterService.queryProjectParameterListPaging(loginUser, projectCode, pageSize, pageNo,
                null, null);
        assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testBatchDeleteProjectParametersByCodes() {
        User loginUser = getGeneralUser();

        Result result = projectParameterService.batchDeleteProjectParametersByCodes(loginUser, projectCode, "");
        assertEquals(Status.PROJECT_PARAMETER_CODE_EMPTY.getCode(), result.getCode());

        when(projectParameterMapper.queryByCodes(any())).thenReturn(Collections.singletonList(getProjectParameter()));

        AssertionsHelper.assertThrowsServiceException(Status.PROJECT_PARAMETER_NOT_EXISTS,
                () -> projectParameterService.batchDeleteProjectParametersByCodes(loginUser, projectCode, "1,2"));

        projectParameterService.batchDeleteProjectParametersByCodes(loginUser, projectCode, "1");
    }

    private Project getProject(long projectCode) {
        Project project = new Project();
        project.setCode(projectCode);
        project.setId(1);
        project.setName("test");
        project.setUserId(1);
        return project;
    }

    private ProjectParameter getProjectParameter() {
        ProjectParameter projectParameter = new ProjectParameter();
        projectParameter.setId(1);
        projectParameter.setCode(1);
        projectParameter.setProjectCode(1);
        projectParameter.setParamName("key");
        projectParameter.setParamValue("value");
        return projectParameter;
    }
}
