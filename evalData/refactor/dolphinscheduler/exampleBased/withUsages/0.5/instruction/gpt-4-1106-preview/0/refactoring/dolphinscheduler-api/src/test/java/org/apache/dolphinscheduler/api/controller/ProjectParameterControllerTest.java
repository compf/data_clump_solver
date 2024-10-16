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

package org.apache.dolphinscheduler.api.controller;

import org.apache.dolphinscheduler.api.enums.Status;
import org.apache.dolphinscheduler.api.service.impl.ProjectParameterServiceImpl;
import org.apache.dolphinscheduler.api.utils.Result;
import org.apache.dolphinscheduler.common.enums.UserType;
import org.apache.dolphinscheduler.dao.entity.User;
import org.apache.dolphinscheduler.plugin.task.api.enums.DataType;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ProjectParameterControllerTest {

    @InjectMocks
    private ProjectParameterController projectParameterController;

    @Mock
    private ProjectParameterServiceImpl projectParameterService;

    @Test
    public void testCreateProjectParameter() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.createProjectParameter(Mockito.any())).thenReturn(getSuccessResult());
        CreateProjectParameterParams params = new CreateProjectParameterParams()
                .withProjectCode(1L)
                .withProjectParameterName("key")
                .withProjectParameterValue("value")
                .withProjectParameterDataType(DataType.VARCHAR.name());
        Result result = projectParameterController.createProjectParameter(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testUpdateProjectParameter() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.updateProjectParameter(Mockito.any())).thenReturn(getSuccessResult());
        UpdateProjectParameterParams params = new UpdateProjectParameterParams()
                .withProjectCode(1L)
                .withCode(1L)
                .withProjectParameterName("key")
                .withProjectParameterValue("value")
                .withProjectParameterDataType(DataType.LONG.name());
        Result result = projectParameterController.updateProjectParameter(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testDeleteProjectParametersByCode() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.deleteProjectParametersByCode(Mockito.any())).thenReturn(getSuccessResult());
        DeleteProjectParametersByCodeParams params = new DeleteProjectParametersByCodeParams()
                .withProjectCode(1L)
                .withCode(1L);
        Result result = projectParameterController.deleteProjectParametersByCode(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testBatchDeleteProjectParametersByCodes() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.batchDeleteProjectParametersByCodes(Mockito.any())).thenReturn(getSuccessResult());
        BatchDeleteProjectParametersByCodesParams params = new BatchDeleteProjectParametersByCodesParams()
                .withProjectCode(1L)
                .withCodes("1");
        Result result = projectParameterController.batchDeleteProjectParametersByCodes(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testQueryProjectParameterListPaging() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.queryProjectParameterListPaging(Mockito.any())).thenReturn(getSuccessResult());
        QueryProjectParameterListPagingParams params = new QueryProjectParameterListPagingParams()
                .withProjectCode(1L)
                .withSearchVal("1")
                .withProjectParameterDataType(DataType.VARCHAR.name())
                .withPageNo(1)
                .withPageSize(10);
        Result result = projectParameterController.queryProjectParameterListPaging(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    @Test
    public void testQueryProjectParameterByCode() {
        User loginUser = getGeneralUser();

        Mockito.when(projectParameterService.queryProjectParameterByCode(Mockito.any())).thenReturn(getSuccessResult());
        QueryProjectParameterByCodeParams params = new QueryProjectParameterByCodeParams()
                .withProjectCode(1L)
                .withCode(1L);
        Result result = projectParameterController.queryProjectParameterByCode(loginUser, params);
        Assertions.assertEquals(Status.SUCCESS.getCode(), result.getCode());
    }

    private User getGeneralUser() {
        User loginUser = new User();
        loginUser.setUserType(UserType.GENERAL_USER);
        loginUser.setUserName("userName");
        loginUser.setId(1);
        return loginUser;
    }

    private Result getSuccessResult() {
        Result result = new Result();
        result.setCode(Status.SUCCESS.getCode());
        result.setMsg(Status.SUCCESS.getMsg());
        return result;
    }

}
