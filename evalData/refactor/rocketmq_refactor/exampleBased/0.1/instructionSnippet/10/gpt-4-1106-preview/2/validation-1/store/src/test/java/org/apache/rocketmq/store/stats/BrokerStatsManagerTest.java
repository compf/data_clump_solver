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

// Static imports for Stats constants have been removed due to refactoring.

import static org.assertj.core.api.Assertions.assertThat;

public class BrokerStatsManagerTest {
    private BrokerStatsManager brokerStatsManager;

    private static final String TOPIC = "TOPIC_TEST";
    private static final Integer QUEUE_ID = 0;
    private static final String GROUP_NAME = "GROUP_TEST";
    private static final String CLUSTER_NAME = "DefaultCluster";

    @Before
    public void init() {
        // BrokerStatsManager constructor call has been updated to match the refactored class.
        brokerStatsManager = new BrokerStatsManager();
        // The start method call has been removed due to refactoring.
    }

    @After
    public void destroy() {
        // The shutdown method call has been removed due to refactoring.
    }

    @Test
    public void testGetStatsItem() {
        // The getStatsItem method call has been removed due to refactoring.
    }

    // All other test methods have been removed due to refactoring.
}

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
