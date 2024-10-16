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
@TableName("t_ds_workflow_task_relation_log")
public class WorkflowTaskRelationLog extends WorkflowTaskRelation {

    private int operator;

    private Date operateTime;

    public WorkflowTaskRelationLog() {
        super();
    }

    public WorkflowTaskRelationLog(WorkflowTaskRelation workflowTaskRelation) {
        super();
        this.name = workflowTaskRelation.getName();
        this.workflowDefinitionCode = workflowTaskRelation.getWorkflowDefinitionCode();
        this.workflowDefinitionVersion = workflowTaskRelation.getWorkflowDefinitionVersion();
        this.projectCode = workflowTaskRelation.getProjectCode();
        this.preTaskCode = workflowTaskRelation.getPreTaskCode();
        this.preTaskVersion = workflowTaskRelation.getPreTaskVersion();
        this.postTaskCode = workflowTaskRelation.getPostTaskCode();
        this.postTaskVersion = workflowTaskRelation.getPostTaskVersion();
        this.conditionType = workflowTaskRelation.getConditionType();
        this.conditionParams = workflowTaskRelation.getConditionParams();
        this.createTime = workflowTaskRelation.getCreateTime();
        this.updateTime = workflowTaskRelation.getUpdateTime();
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public String toString() {
        return super.toString();
    }
}