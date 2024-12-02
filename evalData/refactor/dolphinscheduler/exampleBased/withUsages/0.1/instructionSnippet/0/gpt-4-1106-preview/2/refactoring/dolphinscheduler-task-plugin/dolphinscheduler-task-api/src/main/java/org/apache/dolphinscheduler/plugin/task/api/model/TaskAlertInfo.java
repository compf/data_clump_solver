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

package org.apache.dolphinscheduler.plugin.task.api.model;

public class TaskAlertInfo {

    private AlertInfo alertInfo;



    public String getTitle() {
        return alertInfo.getTitle();
    }

    public void setTitle(String title) {
        this.alertInfo = new AlertInfo(title, content, alertGroupId);
    }

    public String getContent() {
        return alertInfo.getContent();
    }

    public void setContent(String content) {
        this.alertInfo.setContent(content);
    }

    public Integer getAlertGroupId() {
        return alertInfo.getAlertGroupId();
    }

    public void setAlertGroupId(Integer alertGroupId) {
        this.alertInfo.setAlertGroupId(alertGroupId);
    }
}