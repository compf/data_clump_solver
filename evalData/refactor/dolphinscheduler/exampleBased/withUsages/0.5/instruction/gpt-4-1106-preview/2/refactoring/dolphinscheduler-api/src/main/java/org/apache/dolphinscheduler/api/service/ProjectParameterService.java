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

package org.apache.dolphinscheduler.api.service;

import org.apache.dolphinscheduler.api.utils.Result;
import org.apache.dolphinscheduler.dao.entity.User;

public interface ProjectParameterService {

    Result createProjectParameter(ProjectParameterInfo projectParameterInfo, long projectCode,
                                  String projectParameterValue);

    Result updateProjectParameter(ProjectParameterInfo projectParameterInfo, long projectCode, long code,
                                  String projectParameterValue);

    Result deleteProjectParametersByCode(ProjectParameterInfo projectParameterInfo, long projectCode);

    Result batchDeleteProjectParametersByCodes(ProjectParameterInfo projectParameterInfo, long projectCode);

    Result queryProjectParameterListPaging(ProjectParameterInfo projectParameterInfo, long projectCode, Integer pageSize, Integer pageNo,
                                           String searchVal);

    Result queryProjectParameterByCode(ProjectParameterInfo projectParameterInfo, long projectCode, long code);
}
