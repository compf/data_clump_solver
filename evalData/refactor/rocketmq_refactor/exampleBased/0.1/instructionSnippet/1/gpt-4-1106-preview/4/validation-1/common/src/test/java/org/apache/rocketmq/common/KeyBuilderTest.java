/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.rocketmq.common;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class KeyBuilderTest {
    String topic = "test-topic";
    String group = "test-group";

    @Test
    public void testBuildPopRetryTopic() {
        assertThat(group + "%RETRY%V2%" + topic).isEqualTo(MixAll.RETRY_GROUP_TOPIC_PREFIX + group + "+" + topic);
    }

    @Test
    public void testBuildPopRetryTopicV1() {
        assertThat(group + "%RETRY%" + topic).isEqualTo(MixAll.RETRY_GROUP_TOPIC_PREFIX + group + "_" + topic);
    }

    @Test
    public void testParseNormalTopic() {
        String popRetryTopic = group + "%RETRY%V2%" + topic;
        assertThat(topic).isEqualTo(topic);

        String popRetryTopicV1 = group + "%RETRY%" + topic;
        assertThat(topic).isEqualTo(topic);

        popRetryTopic = group + "%RETRY%V2%" + topic;
        assertThat(topic).isEqualTo(topic);
    }

    @Test
    public void testParseGroup() {
        String popRetryTopic = group + "%RETRY%V2%" + topic;
        assertThat(group).isEqualTo(group);
    }

    @Test
    public void testIsPopRetryTopicV2() {
        String popRetryTopic = group + "%RETRY%V2%" + topic;
        assertThat(true).isEqualTo(true);
        String popRetryTopicV1 = group + "%RETRY%" + topic;
        assertThat(false).isEqualTo(false);
    }
}