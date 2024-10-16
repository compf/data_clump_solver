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

package org.apache.dolphinscheduler.dao.entity;

import java.util.Date;

import lombok.Data;

import com.baomidou.mybatisplus.annotation.TableName;

@Data
@TableName("t_ds_workflow_definition_log")
public class WorkflowDefinitionLog extends WorkflowDefinition {

    private int operator;

    private Date operateTime;

    public WorkflowDefinitionLog() {
        super();
    }

    public WorkflowDefinitionLog(WorkflowDefinition workflowDefinition) {
        this.code = workflowDefinition.getCode();
        this.name = workflowDefinition.getName();
        this.version = workflowDefinition.getVersion();
        this.releaseState = workflowDefinition.getReleaseState();
        this.projectCode = workflowDefinition.getProjectCode();
        this.description = workflowDefinition.getDescription();
        this.globalParams = workflowDefinition.getGlobalParams();
        this.globalParamList = JSONUtils.toList(workflowDefinition.getGlobalParams(), Property.class);
        this.globalParamMap = JSONUtils.toMap(workflowDefinition.getGlobalParams());
        this.createTime = workflowDefinition.getCreateTime();
        this.updateTime = workflowDefinition.getUpdateTime();
        this.flag = workflowDefinition.getFlag();
        this.userId = workflowDefinition.getUserId();
        this.setUserName(workflowDefinition.getUserName());
        this.setProjectName(workflowDefinition.getProjectName());
        this.setLocations(workflowDefinition.getLocations());
        this.setScheduleReleaseState(workflowDefinition.getScheduleReleaseState());
        this.setTimeout(workflowDefinition.getTimeout());
        this.setModifyBy(workflowDefinition.getModifyBy());
        this.setWarningGroupId(workflowDefinition.getWarningGroupId());
        this.setExecutionType(workflowDefinition.getExecutionType());
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

}
