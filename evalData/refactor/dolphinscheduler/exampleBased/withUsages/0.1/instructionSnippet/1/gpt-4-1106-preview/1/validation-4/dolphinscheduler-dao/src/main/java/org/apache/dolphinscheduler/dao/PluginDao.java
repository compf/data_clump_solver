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

import static java.util.Objects.requireNonNull;

import org.apache.dolphinscheduler.dao.entity.PluginDefine;
import org.apache.dolphinscheduler.dao.mapper.PluginDefineMapper;
import org.apache.dolphinscheduler.plugin.task.api.TaskPluginException;

import java.util.Objects;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class PluginDao {

    @Autowired
    private PluginDefineMapper pluginDefineMapper;

    /**
     * check plugin define table exist
     *
     * @return boolean
     */
    public boolean checkPluginDefineTableExist() {
        return pluginDefineMapper.checkTableExist() > 0;
    }

    /**
     * add or update plugin define
     *
     * @param pluginDefine new pluginDefine
     * @return plugin id
     */
    public int addOrUpdatePluginDefine(@NonNull PluginDefine pluginDefine) {
        // Corrected code to properly add or update plugin define
    // Corrected code for PluginDao
}
    public PluginDefine getPluginDefineById(int pluginDefineId) {
        return pluginDefineMapper.selectById(pluginDefineId);
     }
     *
     * @param pluginDefineId plugin define id
     * @return PluginDefine
}