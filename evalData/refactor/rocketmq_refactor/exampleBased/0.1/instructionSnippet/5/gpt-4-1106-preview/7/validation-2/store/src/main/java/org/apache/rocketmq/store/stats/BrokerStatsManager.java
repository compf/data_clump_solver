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

    public static final String DLQ_PUT_NUMS = "DLQ_PUT_NUMS";
    public static final String BROKER_ACK_NUMS = "BROKER_ACK_NUMS";
    public static final String BROKER_CK_NUMS = "BROKER_CK_NUMS";
    public static final String BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC = "BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC";
    public static final String BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC = "BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC";
    public static final String SNDBCK2DLQ_TIMES = "SNDBCK2DLQ_TIMES";

    public static final String COMMERCIAL_OWNER = "Owner";

    public static final String ACCOUNT_OWNER_PARENT = "OWNER_PARENT";
    public static final String ACCOUNT_OWNER_SELF = "OWNER_SELF";

    public static final long ACCOUNT_STAT_INVERTAL = 60 * 1000;
    public static final String ACCOUNT_AUTH_TYPE = "AUTH_TYPE";

    public static final String ACCOUNT_SEND = "SEND";
    public static final String ACCOUNT_RCV = "RCV";
    public static final String ACCOUNT_SEND_BACK = "SEND_BACK";
    public static final String ACCOUNT_SEND_BACK_TO_DLQ = "SEND_BACK_TO_DLQ";
    public static final String ACCOUNT_AUTH_FAILED = "AUTH_FAILED";
    public static final String ACCOUNT_SEND_REJ = "SEND_REJ";
    public static final String ACCOUNT_REV_REJ = "RCV_REJ";

    public static final String MSG_NUM = "MSG_NUM";
    public static final String MSG_SIZE = "MSG_SIZE";
    public static final String SUCCESS_MSG_NUM = "SUCCESS_MSG_NUM";
    public static final String FAILURE_MSG_NUM = "FAILURE_MSG_NUM";
    public static final String COMMERCIAL_MSG_NUM = "COMMERCIAL_MSG_NUM";
    public static final String SUCCESS_REQ_NUM = "SUCCESS_REQ_NUM";
    public static final String FAILURE_REQ_NUM = "FAILURE_REQ_NUM";

    public static final String CHANNEL_ACTIVITY = "CHANNEL_ACTIVITY";
    public static final String CHANNEL_ACTIVITY_CONNECT = "CONNECT";
    public static final String CHANNEL_ACTIVITY_IDLE = "IDLE";
    public static final String CHANNEL_ACTIVITY_EXCEPTION = "EXCEPTION";
package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.BrokerConfig;
import org.apache.rocketmq.common.stats.StatsItem;
import org.apache.rocketmq.common.stats.StatsItemSet;
import org.apache.rocketmq.common.stats.MomentStatsItemSet;
import org.apache.rocketmq.common.statistics.StatisticsManager;
import org.apache.rocketmq.logging.Logger;
import org.apache.rocketmq.logging.LoggerFactory;
import org.apache.rocketmq.common.constant.LoggerName;
import java.util.HashMap;
import java.util.concurrent.ScheduledExecutorService;

public class BrokerStatsManager {
    // Class members go here
}
    }

    public void incChannelIdleNum() {
        this.statsTable.get(CHANNEL_ACTIVITY).addValue(CHANNEL_ACTIVITY_IDLE, 1, 1);
    }

    public void incTopicPutNums(final String topic) {
        this.statsTable.get(Stats.TOPIC_PUT_NUMS).addValue(topic, 1, 1);
    }

    public void incTopicPutNums(final String topic, int num, int times) {
        this.statsTable.get(Stats.TOPIC_PUT_NUMS).addValue(topic, num, times);
    }

    public void incTopicPutSize(final String topic, final int size) {
        this.statsTable.get(Stats.TOPIC_PUT_SIZE).addValue(topic, size, 1);
    }

    public void incGroupGetNums(final String group, final String topic, final int incValue) {
        final String statsKey = buildStatsKey(topic, group);
        this.statsTable.get(Stats.GROUP_GET_NUMS).addValue(statsKey, incValue, 1);
    }

    public void incGroupCkNums(final String group, final String topic, final int incValue) {
        final String statsKey = buildStatsKey(topic, group);
        this.statsTable.get(GROUP_CK_NUMS).addValue(statsKey, incValue, 1);
    }

    public void incGroupAckNums(final String group, final String topic, final int incValue) {
        final String statsKey = buildStatsKey(topic, group);
        this.statsTable.get(GROUP_ACK_NUMS).addValue(statsKey, incValue, 1);
    }

    public String buildStatsKey(String topic, String group) {
        StringBuilder strBuilder;
        if (topic != null && group != null) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 1);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(topic).append("@").append(group);
        return strBuilder.toString();
    }

    public String buildStatsKey(String topic, int queueId) {
        StringBuilder strBuilder;
        if (topic != null) {
            strBuilder = new StringBuilder(topic.length() + 5);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(topic).append("@").append(queueId);
        return strBuilder.toString();
    }

    public String buildStatsKey(String topic, int queueId, String group) {
        StringBuilder strBuilder;
        if (topic != null && group != null) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 6);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(topic).append("@").append(queueId).append("@").append(group);
        return strBuilder.toString();
    }

    public String buildStatsKey(int queueId, String topic, String group) {
        StringBuilder strBuilder;
        if (topic != null && group != null) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 6);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(queueId).append("@").append(topic).append("@").append(group);
        return strBuilder.toString();
    }

    public void incGroupGetSize(final String group, final String topic, final int incValue) {
        final String statsKey = buildStatsKey(topic, group);
        this.statsTable.get(Stats.GROUP_GET_SIZE).addValue(statsKey, incValue, 1);
    }

    public void incGroupGetLatency(final String group, final String topic, final int queueId, final int incValue) {
        String statsKey;
        if (enableQueueStat) {
            statsKey = buildStatsKey(queueId, topic, group);
        } else {
            statsKey = buildStatsKey(topic, group);
        }
        this.statsTable.get(Stats.GROUP_GET_LATENCY).addRTValue(statsKey, incValue, 1);
    }

    public void incTopicPutLatency(final String topic, final int queueId, final int incValue) {
        StringBuilder statsKey;
        if (topic != null) {
            statsKey = new StringBuilder(topic.length() + 6);
        } else {
            statsKey = new StringBuilder(6);
        }
        statsKey.append(queueId).append("@").append(topic);
        this.statsTable.get(TOPIC_PUT_LATENCY).addValue(statsKey.toString(), incValue, 1);
    }

    public void incBrokerPutNums() {
        this.statsTable.get(Stats.BROKER_PUT_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(1);
    }

    public void incBrokerPutNums(final String topic, final int incValue) {
        this.statsTable.get(Stats.BROKER_PUT_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
        incBrokerPutNumsWithoutSystemTopic(topic, incValue);
    }

    public void incBrokerGetNums(final String topic, final int incValue) {
        this.statsTable.get(Stats.BROKER_GET_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
        this.incBrokerGetNumsWithoutSystemTopic(topic, incValue);
    }

    public void incBrokerAckNums(final int incValue) {
        this.statsTable.get(BROKER_ACK_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
    }

    public void incBrokerCkNums(final int incValue) {
        this.statsTable.get(BROKER_CK_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
    }

    public void incBrokerGetNumsWithoutSystemTopic(final String topic, final int incValue) {
        if (TopicValidator.isSystemTopic(topic)) {
            return;
        }
        this.statsTable.get(BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
    }

    public void incBrokerPutNumsWithoutSystemTopic(final String topic, final int incValue) {
        if (TopicValidator.isSystemTopic(topic)) {
            return;
        }
        this.statsTable.get(BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
    }

    public long getBrokerGetNumsWithoutSystemTopic() {
        final StatsItemSet statsItemSet = this.statsTable.get(BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC);
        if (statsItemSet == null) {
            return 0;
        }
        final StatsItem statsItem = statsItemSet.getStatsItem(this.clusterName);
        if (statsItem == null) {
            return 0;
        }
        return statsItem.getValue().longValue();
    }

    public long getBrokerPutNumsWithoutSystemTopic() {
        final StatsItemSet statsItemSet = this.statsTable.get(BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC);
        if (statsItemSet == null) {
            return 0;
        }
        final StatsItem statsItem = statsItemSet.getStatsItem(this.clusterName);
        if (statsItem == null) {
            return 0;
        }
        return statsItem.getValue().longValue();
    }

    public void incSendBackNums(final String group, final String topic) {
        final String statsKey = buildStatsKey(topic, group);
        this.statsTable.get(Stats.SNDBCK_PUT_NUMS).addValue(statsKey, 1, 1);
    }


        final String topic, final String type, final int incValue) {
        final String statsKey = buildCommercialStatsKey(owner, topic, group, type);
        this.statsTable.get(key).addValue(statsKey, incValue, 1);
    }

    public void incCommercialValue(final String key, final String owner, final String group,
        final String topic, final String type, final int incValue) {
        final String statsKey = buildCommercialStatsKey(owner, topic, group, type);
        this.statsTable.get(key).addValue(statsKey, incValue, 1);
    }

    public void incAccountValue(final String key, final String accountOwnerParent, final String accountOwnerSelf,
        final String instanceId, final String group, final String topic,
        final String msgType, final int incValue) {
        final String statsKey = buildAccountStatsKey(accountOwnerParent, accountOwnerSelf, instanceId, topic, group,
            msgType);
        this.statsTable.get(key).addValue(statsKey, incValue, 1);
    }

    public void incAccountValue(final String key, final String accountOwnerParent, final String accountOwnerSelf,
        final String instanceId, final String group, final String topic,
        final String msgType, final String flowlimitThreshold, final int incValue) {
        final String statsKey = buildAccountStatsKey(accountOwnerParent, accountOwnerSelf, instanceId, topic, group,
            msgType, flowlimitThreshold);
        this.statsTable.get(key).addValue(statsKey, incValue, 1);
    }

    public void incAccountValue(final String statType, final String owner, final String instanceId, final String topic,
        final String group, final String msgType,
        final long... incValues) {
        final String key = buildAccountStatKey(owner, instanceId, topic, group, msgType);
        this.accountStatManager.inc(statType, key, incValues);
    }

    public void incAccountValue(final String statType, final String owner, final String instanceId, final String topic,
        final String group, final String msgType, final String flowlimitThreshold,
        final long... incValues) {
        final String key = buildAccountStatKey(owner, instanceId, topic, group, msgType, flowlimitThreshold);
        this.accountStatManager.inc(statType, key, incValues);
    }

    public String buildCommercialStatsKey(String owner, String topic, String group, String type) {
        StringBuilder strBuilder = new StringBuilder();
        strBuilder.append(owner);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(type);
        return strBuilder.toString();
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId,
        String topic, String group, String msgType) {
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(accountOwnerParent);
        strBuilder.append("@");
        strBuilder.append(accountOwnerSelf);
        strBuilder.append("@");
        strBuilder.append(instanceId);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(msgType);
        return strBuilder.toString();
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId,
        String topic, String group, String msgType, String flowlimitThreshold) {
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(accountOwnerParent);
        strBuilder.append("@");
        strBuilder.append(accountOwnerSelf);
        strBuilder.append("@");
        strBuilder.append(instanceId);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(msgType);
        strBuilder.append("@");
        strBuilder.append(flowlimitThreshold);
        return strBuilder.toString();
    }

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType) {
        final String sep = "|";
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(owner).append(sep);
        strBuilder.append(instanceId).append(sep);
        strBuilder.append(topic).append(sep);
        strBuilder.append(group).append(sep);
        strBuilder.append(msgType);
        return strBuilder.toString();
    }

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType, String flowlimitThreshold) {
        final String sep = "|";
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(owner).append(sep);
        strBuilder.append(instanceId).append(sep);
        strBuilder.append(topic).append(sep);
        strBuilder.append(group).append(sep);
        strBuilder.append(msgType).append(sep);
        strBuilder.append(flowlimitThreshold);
        return strBuilder.toString();
    }

    public String[] splitAccountStatKey(final String accountStatKey) {
        final String sep = "\\|";
        return accountStatKey.split(sep);
    }

    private StatisticsKindMeta createStatisticsKindMeta(String name,
        String[] itemNames,
        ScheduledExecutorService executorService,
        StatisticsItemFormatter formatter,
        Logger log,
        long interval) {
        final BrokerConfig brokerConfig = this.brokerConfig;
        StatisticsItemPrinter printer = new StatisticsItemPrinter(formatter, log);
        StatisticsKindMeta kindMeta = new StatisticsKindMeta();
        kindMeta.setName(name);
        kindMeta.setItemNames(itemNames);
        kindMeta.setScheduledPrinter(
            new StatisticsItemScheduledIncrementPrinter(
                "Stat In One Minute: ",
                printer,
                executorService,
                new StatisticsItemScheduledPrinter.InitialDelay() {
                    @Override
                    public long get() {
                        return Math.abs(UtilAll.computeNextMinutesTimeMillis() - System.currentTimeMillis());
                    }
                },
                interval,
                new String[] {MSG_NUM},
                new StatisticsItemScheduledIncrementPrinter.Valve() {
                    @Override
                    public boolean enabled() {
                        return brokerConfig != null ? brokerConfig.isAccountStatsEnable() : true;
                    }

                    @Override
                    public boolean printZeroLine() {
                        return brokerConfig != null ? brokerConfig.isAccountStatsPrintZeroValues() : true;
                    }
                }
            )
        );
        return kindMeta;
    }

    public interface StateGetter {
        boolean online(String instanceId, String group, String topic);
    }

    public enum StatsType {
        SEND_SUCCESS,
        SEND_FAILURE,

        RCV_SUCCESS,
        RCV_EPOLLS,
        SEND_BACK,
        SEND_BACK_TO_DLQ,

        SEND_ORDER,
        SEND_TIMER,
        SEND_TRANSACTION,

        PERM_FAILURE
    }
}
