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

package org.apache.dolphinscheduler.dao;

import org.apache.dolphinscheduler.common.enums.AlertEvent;
import org.apache.dolphinscheduler.common.enums.AlertStatus;
import org.apache.dolphinscheduler.common.enums.AlertType;
import org.apache.dolphinscheduler.common.enums.AlertWarnLevel;
import org.apache.dolphinscheduler.common.enums.WarningType;
import org.apache.dolphinscheduler.common.utils.JSONUtils;
import org.apache.dolphinscheduler.dao.entity.Alert;
import org.apache.dolphinscheduler.dao.entity.AlertPluginInstance;
import org.apache.dolphinscheduler.dao.entity.AlertSendStatus;
import org.apache.dolphinscheduler.dao.entity.ProjectUser;
import org.apache.dolphinscheduler.dao.entity.ServerAlertContent;
import org.apache.dolphinscheduler.dao.entity.TaskInstance;
import org.apache.dolphinscheduler.dao.entity.WorkflowAlertContent;
import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;
import org.apache.dolphinscheduler.dao.mapper.AlertGroupMapper;
import org.apache.dolphinscheduler.dao.mapper.AlertMapper;
import org.apache.dolphinscheduler.dao.mapper.AlertPluginInstanceMapper;
import org.apache.dolphinscheduler.dao.mapper.AlertSendStatusMapper;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.math.NumberUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;

@Component
@Slf4j
public class AlertDao {

    private static final Integer QUERY_ALERT_THRESHOLD = 100;

    private static final int ADMIN_ALERT_GROUP_ID = 1;

    @Value("${alert.alarm-suppression.crash:60}")
    private Integer crashAlarmSuppression;

    @Autowired
    private AlertMapper alertMapper;

    @Autowired
    private AlertPluginInstanceMapper alertPluginInstanceMapper;

    @Autowired
    private AlertGroupMapper alertGroupMapper;

    @Autowired
    private AlertSendStatusMapper alertSendStatusMapper;

    /**
     * insert alert
     *
     * @param alert alert
     * @return add alert result
     */

    /**
     * update alert sending(execution) status
     *
     * @param alertStatus alertStatus
     * @param log         alert results json
     * @param id          id
     * @return update alert result

    /**
     * generate sign for alert
     *
     * @param alert alert
     * @return sign's str
     */
    private String generateSign(Alert alert) {
        return Optional.ofNullable(alert.getContent())
                .map(DigestUtils::sha1Hex)
                .map(String::toLowerCase).orElse(null)

    /**
     * add AlertSendStatus
     *
     * @param sendStatus            alert send status
     * @param log                   log
     * @param alertId               alert id
     * @param alertPluginInstanceId alert plugin instance id
     * @return insert count

    /**
     * MasterServer or WorkerServer stopped
     *
     * @param host         host
     * @param serverType   serverType

                .host(host)
                .event(AlertEvent.SERVER_DOWN)

    /**
     * workflow time out alert
     *
     * @param workflowInstance workflowInstance
     * @param projectUser     projectUser

                .projectName(projectUser.getProjectName())
                .owner(projectUser.getUserName())
                .workflowInstanceId(workflowInstance.getId())
                .workflowDefinitionCode(workflowInstance.getWorkflowDefinitionCode())
                .workflowInstanceName(workflowInstance.getName())
                .commandType(workflowInstance.getCommandType())
                .workflowExecutionStatus(workflowInstance.getState())
                .runTimes(workflowInstance.getRunTimes())
                .workflowStartTime(workflowInstance.getStartTime())
                .workflowHost(workflowInstance.getHost())
                .event(AlertEvent.TIME_OUT)
                .warnLevel(AlertWarnLevel.MIDDLE)

    private void saveTaskTimeoutAlert(Alert alert, String content, int alertGroupId) {

    /**
     * task timeout warn
     *
     * @param workflowInstance workflowInstance
     * @param taskInstance    taskInstance
     * @param projectUser     projectUser

                                     ProjectUser projectUser) {

                .projectName(projectUser.getProjectName())
                .owner(projectUser.getUserName())
                .workflowInstanceId(workflowInstance.getId())
                .workflowDefinitionCode(workflowInstance.getWorkflowDefinitionCode())
                .workflowInstanceName(workflowInstance.getName())
                .taskCode(taskInstance.getTaskCode())
                .taskName(taskInstance.getName())
                .taskType(taskInstance.getTaskType())
                .taskStartTime(taskInstance.getStartTime())
                .taskHost(taskInstance.getHost())
                .event(AlertEvent.TIME_OUT)
                .warnLevel(AlertWarnLevel.MIDDLE)

    /**
     * List pending alerts which id > minAlertId and status = {@link AlertStatus#WAIT_EXECUTION} order by id asc.

    /**
     * list all alert plugin instance by alert group id
     *
     * @param alertGroupId alert group id
     * @return AlertPluginInstance list

                .map(Alert::getId)

