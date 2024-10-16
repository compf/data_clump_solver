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
        this.code = taskDefinition.getCode();
        this.version = taskDefinition.getVersion();
        this.name = taskDefinition.getName();
        this.description = taskDefinition.getDescription();
        this.userId = taskDefinition.getUserId();
        this.userName = taskDefinition.getUserName();
        this.workerGroup = taskDefinition.getWorkerGroup();
        this.environmentCode = taskDefinition.getEnvironmentCode();
        this.projectCode = taskDefinition.getProjectCode();
        this.projectName = taskDefinition.getProjectName();
        this.resourceIds = taskDefinition.getResourceIds();
        this.taskParams = taskDefinition.getTaskParams();
        this.taskParamList = JSONUtils.toList(taskDefinition.getTaskParams(), Property.class);
        this.taskParamMap = JSONUtils.toMap(taskDefinition.getTaskParams());
        this.taskPriority = taskDefinition.getTaskPriority();
        this.taskExecuteType = taskDefinition.getTaskExecuteType();
        this.timeoutNotifyStrategy = taskDefinition.getTimeoutNotifyStrategy();
        this.taskType = taskDefinition.getTaskType();
        this.timeout = taskDefinition.getTimeout();
        this.delayTime = taskDefinition.getDelayTime();
        this.timeoutFlag = taskDefinition.getTimeoutFlag();
        this.updateTime = taskDefinition.getUpdateTime();
        this.createTime = taskDefinition.getCreateTime();
        this.failRetryInterval = taskDefinition.getFailRetryInterval();
        this.failRetryTimes = taskDefinition.getFailRetryTimes();
        this.flag = taskDefinition.getFlag();
        this.isCache = taskDefinition.getIsCache();
        this.modifyBy = taskDefinition.getModifyBy();
        this.cpuQuota = taskDefinition.getCpuQuota();
        this.memoryMax = taskDefinition.getMemoryMax();
    }
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
