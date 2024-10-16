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

import com.baomidou.mybatisplus.annotation.TableName;

/**
 * task definition log
 */
@TableName("t_ds_task_definition_log")
public class TaskDefinitionLog extends TaskDefinition {

    /**
     * operator user id
     */
    private int operator;

    /**
     * operate time
     */
    private Date operateTime;

    public TaskDefinitionLog() {
        super();
    }

    public TaskDefinitionLog(TaskDefinition taskDefinition) {
        super();
        this.code = taskDefinition.code;
        this.version = taskDefinition.version;
        this.name = taskDefinition.name;
        this.description = taskDefinition.description;
        this.userId = taskDefinition.userId;
        this.userName = taskDefinition.userName;
        this.workerGroup = taskDefinition.workerGroup;
        this.environmentCode = taskDefinition.environmentCode;
        this.projectCode = taskDefinition.projectCode;
        this.projectName = taskDefinition.projectName;
        this.resourceIds = taskDefinition.resourceIds;
        this.taskParams = taskDefinition.taskParams;
        this.taskParamList = JSONUtils.toList(taskDefinition.taskParams, Property.class);
        this.taskParamMap = JSONUtils.toMap(taskDefinition.taskParams);
        this.taskPriority = taskDefinition.taskPriority;
        this.taskExecuteType = taskDefinition.taskExecuteType;
        this.timeoutNotifyStrategy = taskDefinition.timeoutNotifyStrategy;
        this.taskType = taskDefinition.taskType;
        this.timeout = taskDefinition.timeout;
        this.delayTime = taskDefinition.delayTime;
        this.timeoutFlag = taskDefinition.timeoutFlag;
        this.updateTime = taskDefinition.updateTime;
        this.createTime = taskDefinition.createTime;
        this.failRetryInterval = taskDefinition.failRetryInterval;
        this.failRetryTimes = taskDefinition.failRetryTimes;
        this.flag = taskDefinition.flag;
        this.isCache = taskDefinition.isCache;
        this.modifyBy = taskDefinition.modifyBy;
        this.cpuQuota = taskDefinition.cpuQuota;
        this.memoryMax = taskDefinition.memoryMax;
        this.taskExecuteType = taskDefinition.taskExecuteType;
    }

    public int getOperator() {
        return operator;
    }

    public void setOperator(int operator) {
        this.operator = operator;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
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
