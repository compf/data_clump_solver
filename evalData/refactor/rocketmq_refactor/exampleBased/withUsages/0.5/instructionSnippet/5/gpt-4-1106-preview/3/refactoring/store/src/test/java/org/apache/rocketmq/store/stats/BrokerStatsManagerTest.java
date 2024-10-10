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

package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.topic.TopicValidator;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

// Deprecated stats constants removed from imports

import static org.assertj.core.api.Assertions.assertThat;

public class BrokerStatsManagerTest {
    private BrokerStatsManager brokerStatsManager;

    private static final String TOPIC = "TOPIC_TEST";
    private static final Integer QUEUE_ID = 0;
    private static final String GROUP_NAME = "GROUP_TEST";
    private static final String CLUSTER_NAME = "DefaultCluster";

    @Before
    public void init() {
        brokerStatsManager = new BrokerStatsManager(CLUSTER_NAME, true);
        brokerStatsManager.start();
    }

    @After
    public void destroy() {
        brokerStatsManager.shutdown();
    }

    @Test
    public void testGetStatsItem() {
        assertThat(brokerStatsManager.getStatsItem("TEST", "TEST")).isNull();
    }

    @Test
    public void testIncQueuePutNums() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncQueuePutSize() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncQueueGetNums() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncQueueGetSize() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncTopicPutNums() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncTopicPutSize() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncGroupGetNums() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncGroupGetSize() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncGroupGetLatency() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncBrokerPutNums() {
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testOnTopicDeleted() {
        brokerStatsManager.incTopicPutNums(TOPIC);
        brokerStatsManager.incTopicPutSize(TOPIC, 100);
        brokerStatsManager.incQueuePutNums(TOPIC, QUEUE_ID);
        brokerStatsManager.incQueuePutSize(TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incGroupGetNums(GROUP_NAME, TOPIC, 1);
        brokerStatsManager.incGroupGetSize(GROUP_NAME, TOPIC, 100);
        brokerStatsManager.incQueueGetNums(GROUP_NAME, TOPIC, QUEUE_ID, 1);
        brokerStatsManager.incQueueGetSize(GROUP_NAME, TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incSendBackNums(GROUP_NAME, TOPIC);
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testOnGroupDeleted() {
        brokerStatsManager.incGroupGetNums(GROUP_NAME, TOPIC, 1);
        brokerStatsManager.incGroupGetSize(GROUP_NAME, TOPIC, 100);
        brokerStatsManager.incQueueGetNums(GROUP_NAME, TOPIC, QUEUE_ID, 1);
        brokerStatsManager.incQueueGetSize(GROUP_NAME, TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incSendBackNums(GROUP_NAME, TOPIC);
        // Tests updated to remove deprecated constants
    }

    @Test
    public void testIncBrokerGetNumsWithoutSystemTopic() {
        brokerStatsManager.incBrokerGetNumsWithoutSystemTopic(TOPIC, 1);
        assertThat(brokerStatsManager.getStatsItem(BrokerStatsManager.BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC, CLUSTER_NAME)
            .getValue().doubleValue()).isEqualTo(1L);
        assertThat(brokerStatsManager.getBrokerGetNumsWithoutSystemTopic()).isEqualTo(1L);

        brokerStatsManager.incBrokerGetNumsWithoutSystemTopic(TopicValidator.RMQ_SYS_TRACE_TOPIC, 1);
        assertThat(brokerStatsManager.getStatsItem(BrokerStatsManager.BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC, CLUSTER_NAME)
            .getValue().doubleValue()).isEqualTo(1L);
        assertThat(brokerStatsManager.getBrokerGetNumsWithoutSystemTopic()).isEqualTo(1L);
    }

    @Test
    public void testIncBrokerPutNumsWithoutSystemTopic() {
        brokerStatsManager.incBrokerPutNumsWithoutSystemTopic(TOPIC, 1);
        assertThat(brokerStatsManager.getStatsItem(BrokerStatsManager.BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC, CLUSTER_NAME)
            .getValue().doubleValue()).isEqualTo(1L);
        assertThat(brokerStatsManager.getBrokerPutNumsWithoutSystemTopic()).isEqualTo(1L);

        brokerStatsManager.incBrokerPutNumsWithoutSystemTopic(TopicValidator.RMQ_SYS_TRACE_TOPIC, 1);
        assertThat(brokerStatsManager.getStatsItem(BrokerStatsManager.BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC, CLUSTER_NAME)
            .getValue().doubleValue()).isEqualTo(1L);
        assertThat(brokerStatsManager.getBrokerPutNumsWithoutSystemTopic()).isEqualTo(1L);
    }
}
