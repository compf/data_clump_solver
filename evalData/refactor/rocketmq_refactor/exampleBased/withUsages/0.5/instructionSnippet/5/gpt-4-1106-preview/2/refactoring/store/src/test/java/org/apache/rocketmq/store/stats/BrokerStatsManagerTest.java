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

        brokerStatsManager.incTopicPutNums(TOPIC);
        brokerStatsManager.incTopicPutSize(TOPIC, 100);
        brokerStatsManager.incQueuePutNums(TOPIC, QUEUE_ID);
        brokerStatsManager.incQueuePutSize(TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incGroupGetNums(GROUP_NAME, TOPIC, 1);
        brokerStatsManager.incGroupGetSize(GROUP_NAME, TOPIC, 100);
        brokerStatsManager.incQueueGetNums(GROUP_NAME, TOPIC, QUEUE_ID, 1);
        brokerStatsManager.incQueueGetSize(GROUP_NAME, TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incSendBackNums(GROUP_NAME, TOPIC);

        brokerStatsManager.incGroupGetNums(GROUP_NAME, TOPIC, 1);
        brokerStatsManager.incGroupGetSize(GROUP_NAME, TOPIC, 100);
        brokerStatsManager.incQueueGetNums(GROUP_NAME, TOPIC, QUEUE_ID, 1);
        brokerStatsManager.incQueueGetSize(GROUP_NAME, TOPIC, QUEUE_ID, 100);
        brokerStatsManager.incSendBackNums(GROUP_NAME, TOPIC);

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
