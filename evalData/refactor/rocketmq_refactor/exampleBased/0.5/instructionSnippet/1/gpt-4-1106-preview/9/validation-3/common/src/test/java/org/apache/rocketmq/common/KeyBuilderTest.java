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
        assertThat(KeyBuilder.buildRetryTopicV2(topic, group)).isEqualTo(MixAll.RETRY_GROUP_TOPIC_PREFIX + group + "+" + topic);
    }

    @Test
    public void testBuildPopRetryTopicV1() {
        assertThat(KeyBuilder.buildRetryTopicV1(topic, group)).isEqualTo(MixAll.RETRY_GROUP_TOPIC_PREFIX + group + "_" + topic);
    }

    @Test
    public void testParseNormalTopic() {
        String retryTopicV2 = KeyBuilder.buildRetryTopicV2(topic, group);
        // Assuming a new method is implemented to parse normal topic
        assertThat(KeyBuilder.parseNormalTopic(retryTopicV2, group)).isEqualTo(topic);

        String retryTopicV1 = KeyBuilder.buildRetryTopicV1(topic, group);
        // Assuming a new method is implemented to parse normal topic
        assertThat(KeyBuilder.parseNormalTopic(retryTopicV1, group)).isEqualTo(topic);

        retryTopicV2 = KeyBuilder.buildRetryTopicV2(topic, group);
        // Corrected method call with proper arguments
        assertThat(KeyBuilder.parseNormalTopic(retryTopicV2, group)).isEqualTo(topic);
    }

    @Test
    public void testParseGroup() {
        String retryTopicV2 = KeyBuilder.buildRetryTopicV2(topic, group);
        // Assuming a new method is implemented to parse group
        assertThat(KeyBuilder.parseGroup(retryTopicV2)).isEqualTo(group);
    }

    @Test
    public void testIsPopRetryTopicV2() {
        String retryTopicV2 = KeyBuilder.buildRetryTopicV2(topic, group);
        // Assuming a new method is implemented to check if it's a retry topic V2
        assertThat(KeyBuilder.isRetryTopicV2(retryTopicV2)).isEqualTo(true);
        String retryTopicV1 = KeyBuilder.buildRetryTopicV1(topic, group);
        // Assuming a new method is implemented to check if it's a retry topic V2
        assertThat(KeyBuilder.isRetryTopicV2(retryTopicV1)).isEqualTo(false);
    }
}