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

package org.apache.dolphinscheduler.dao.utils;

import org.apache.dolphinscheduler.dao.entity.TaskInstance;

public class TaskInstanceUtils {

    /**
     * Copy the property of given source {@link TaskInstance} to target.
     *
     * @param source Given task instance, copy from.
     * @param target Given task instance, copy to
     * @return a soft copy of given task instance.
     */
    public static void copyTaskInstance(TaskInstance source, TaskInstance target) {
        target.setId(source.getId());
        target.setPid(source.getPid());
        target.setAppLink(source.getAppLink());
        target.setFlag(source.getFlag());
        target.setTaskParams(source.getTaskParams());
        target.setDuration(source.getDuration());
        target.setMaxRetryTimes(source.getMaxRetryTimes());
        target.setRetryInterval(source.getRetryInterval());
        target.setTaskInstancePriority(source.getTaskInstancePriority());
        target.setWorkerGroup(source.getWorkerGroup());
        target.setEnvironmentCode(source.getEnvironmentCode());
        target.setEnvironmentConfig(source.getEnvironmentConfig());
        target.setExecutorId(source.getExecutorId());
        target.setVarPool(source.getVarPool());
        target.setExecutorName(source.getExecutorName());
        target.setDelayTime(source.getDelayTime());
        target.setDryRun(source.getDryRun());
        target.setTaskGroupId(source.getTaskGroupId());
        target.setCpuQuota(source.getCpuQuota());
        target.setMemoryMax(source.getMemoryMax());
        target.setTaskExecuteType(source.getTaskExecuteType());
        target.setTestFlag(source.getTestFlag());
    }
}