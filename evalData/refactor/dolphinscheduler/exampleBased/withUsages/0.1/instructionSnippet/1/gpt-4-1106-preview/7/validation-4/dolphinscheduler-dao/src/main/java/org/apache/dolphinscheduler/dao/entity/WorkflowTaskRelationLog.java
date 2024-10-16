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
        this.name = workflowTaskRelation.name;
        this.workflowDefinitionCode = workflowTaskRelation.workflowDefinitionCode;
        this.workflowDefinitionVersion = workflowTaskRelation.workflowDefinitionVersion;
        this.projectCode = workflowTaskRelation.projectCode;
        this.preTaskCode = workflowTaskRelation.preTaskCode;
        this.preTaskVersion = workflowTaskRelation.preTaskVersion;
        this.postTaskCode = workflowTaskRelation.postTaskCode;
        this.postTaskVersion = workflowTaskRelation.postTaskVersion;
        this.conditionType = workflowTaskRelation.conditionType;
        this.conditionParams = workflowTaskRelation.conditionParams;
        this.createTime = workflowTaskRelation.createTime;
        this.updateTime = workflowTaskRelation.updateTime;
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
