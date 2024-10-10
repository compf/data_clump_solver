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

import java.util.HashMap;
import java.util.concurrent.ScheduledExecutorService;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.rocketmq.common.BrokerConfig;
import org.apache.rocketmq.common.ThreadFactoryImpl;
import org.apache.rocketmq.common.UtilAll;
import org.apache.rocketmq.common.constant.LoggerName;
import org.apache.rocketmq.common.statistics.StatisticsItem;
import org.apache.rocketmq.common.statistics.StatisticsItemFormatter;
import org.apache.rocketmq.common.statistics.StatisticsItemPrinter;
import org.apache.rocketmq.common.statistics.StatisticsItemScheduledIncrementPrinter;
import org.apache.rocketmq.common.statistics.StatisticsItemScheduledPrinter;
import org.apache.rocketmq.common.statistics.StatisticsItemStateGetter;
import org.apache.rocketmq.common.statistics.StatisticsKindMeta;
import org.apache.rocketmq.common.statistics.StatisticsManager;
import org.apache.rocketmq.common.stats.MomentStatsItemSet;
import org.apache.rocketmq.common.stats.StatsItem;
import org.apache.rocketmq.common.stats.StatsItemSet;
import org.apache.rocketmq.common.topic.TopicValidator;
import org.apache.rocketmq.common.utils.ThreadUtils;
import org.apache.rocketmq.logging.org.slf4j.Logger;
import org.apache.rocketmq.logging.org.slf4j.LoggerFactory;

public class BrokerStatsManager {

    private final StatsManager statsManager;

    public BrokerStatsManager(BrokerConfig brokerConfig, ScheduledExecutorService scheduledExecutorService, Logger log) {
        this.statsManager = new StatsManager(brokerConfig, scheduledExecutorService, log);
    }

    // Send message latency
    public static final String TOPIC_PUT_LATENCY = "TOPIC_PUT_LATENCY";
    public static final String GROUP_ACK_NUMS = "GROUP_ACK_NUMS";
    public static final String GROUP_CK_NUMS = "GROUP_CK_NUMS";
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
    public static final String SUCCESS_MSG_SIZE = "SUCCESS_MSG_SIZE";
    public static final String FAILURE_MSG_SIZE = "FAILURE_MSG_SIZE";

    // Consumer Register Time
    public static final String CONSUMER_REGISTER_TIME = "CONSUMER_REGISTER_TIME";
    // Producer Register Time
    public static final String PRODUCER_REGISTER_TIME = "PRODUCER_REGISTER_TIME";
    public static final String CHANNEL_ACTIVITY = "CHANNEL_ACTIVITY";
    public static final String CHANNEL_ACTIVITY_CONNECT = "CONNECT";
    public static final String CHANNEL_ACTIVITY_IDLE = "IDLE";
    public static final String CHANNEL_ACTIVITY_EXCEPTION = "EXCEPTION";
    public static final String CHANNEL_ACTIVITY_CLOSE = "CLOSE";

    /**
     * read disk follow stats
     */
    private static final Logger log = LoggerFactory.getLogger(LoggerName.ROCKETMQ_STATS_LOGGER_NAME);
    private static final Logger COMMERCIAL_LOG = LoggerFactory.getLogger(
        LoggerName.COMMERCIAL_LOGGER_NAME);
    private static final Logger ACCOUNT_LOG = LoggerFactory.getLogger(LoggerName.ACCOUNT_LOGGER_NAME);
    private static final Logger DLQ_STAT_LOG = LoggerFactory.getLogger(
        LoggerName.DLQ_STATS_LOGGER_NAME);
    private ScheduledExecutorService scheduledExecutorService;
    private ScheduledExecutorService commercialExecutor;
    private ScheduledExecutorService accountExecutor;

    private final HashMap<String, StatsItemSet> statsTable = new HashMap<>();
    private final String clusterName;
    private final boolean enableQueueStat;
    private MomentStatsItemSet momentStatsItemSetFallSize;
    private MomentStatsItemSet momentStatsItemSetFallTime;

    private final StatisticsManager accountStatManager = new StatisticsManager();
    private StateGetter producerStateGetter;
    private StateGetter consumerStateGetter;

    private BrokerConfig brokerConfig;

    public BrokerStatsManager(BrokerConfig brokerConfig) {
        this.brokerConfig = brokerConfig;
        this.enableQueueStat = brokerConfig.isEnableDetailStat();
        initScheduleService();
        this.clusterName = brokerConfig.getBrokerClusterName();
        init();
    }

    public BrokerStatsManager(String clusterName, boolean enableQueueStat) {
        this.clusterName = clusterName;
        this.enableQueueStat = enableQueueStat;
        initScheduleService();
        init();
        this.statsTable.put(BROKER_CK_NUMS, new StatsItemSet(BROKER_CK_NUMS, this.scheduledExecutorService, log));
        this.statsManager.incBrokerGetNumsWithoutSystemTopic();
        this.statsManager.incConsumerRegisterTime();
        this.statsManager.incProducerRegisterTime();


        this.statsTable.put(CHANNEL_ACTIVITY, new StatsItemSet(CHANNEL_ACTIVITY, this.scheduledExecutorService, log));

        StatisticsItemFormatter formatter = new StatisticsItemFormatter();
        accountStatManager.setBriefMeta(new Pair[] {
            Pair.of(RT, new long[][] {{50, 50}, {100, 10}, {1000, 10}}),
            Pair.of(INNER_RT, new long[][] {{10, 10}, {100, 10}, {1000, 10}})});
        String[] itemNames = new String[] {
            MSG_NUM, SUCCESS_MSG_NUM, FAILURE_MSG_NUM, COMMERCIAL_MSG_NUM,
            SUCCESS_REQ_NUM, FAILURE_REQ_NUM,
            MSG_SIZE, SUCCESS_MSG_SIZE, FAILURE_MSG_SIZE,
            RT, INNER_RT};
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_SEND, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_RCV, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_SEND_BACK, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_SEND_BACK_TO_DLQ, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_SEND_REJ, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.addStatisticsKindMeta(createStatisticsKindMeta(
            ACCOUNT_REV_REJ, itemNames, this.accountExecutor, formatter, ACCOUNT_LOG, ACCOUNT_STAT_INVERTAL));
        this.accountStatManager.setStatisticsItemStateGetter(new StatisticsItemStateGetter() {
            @Override
            public boolean online(StatisticsItem item) {
                String[] strArr = null;
                try {
                    strArr = splitAccountStatKey(item.getStatObject());
                } catch (Exception e) {
                    log.warn("parse account stat key failed, key: {}", item.getStatObject());
                    return false;
                }

                // TODO ugly
                if (strArr == null || strArr.length < 4) {
                    return false;
                }

                String instanceId = strArr[1];
                String topic = strArr[2];
                String group = strArr[3];

                String kind = item.getStatKind();
                if (ACCOUNT_SEND.equals(kind) || ACCOUNT_SEND_REJ.equals(kind)) {
                    return producerStateGetter.online(instanceId, group, topic);
                } else if (ACCOUNT_RCV.equals(kind) || ACCOUNT_SEND_BACK.equals(kind) || ACCOUNT_SEND_BACK_TO_DLQ.equals(kind) || ACCOUNT_REV_REJ.equals(kind)) {
                    return consumerStateGetter.online(instanceId, group, topic);
                }
                return false;
            }
        });
    }

    private void initScheduleService() {
        this.scheduledExecutorService =
            ThreadUtils.newSingleThreadScheduledExecutor(new ThreadFactoryImpl("BrokerStatsThread", true, brokerConfig));
        this.commercialExecutor =
            ThreadUtils.newSingleThreadScheduledExecutor(new ThreadFactoryImpl("CommercialStatsThread", true, brokerConfig));
        this.accountExecutor =
            ThreadUtils.newSingleThreadScheduledExecutor(new ThreadFactoryImpl("AccountStatsThread", true, brokerConfig));
    }

    public MomentStatsItemSet getMomentStatsItemSetFallSize() {
        return momentStatsItemSetFallSize;
    }

    public MomentStatsItemSet getMomentStatsItemSetFallTime() {
        return momentStatsItemSetFallTime;
    }

    public StateGetter getProducerStateGetter() {
        return producerStateGetter;
    }

    public void setProducerStateGetter(StateGetter producerStateGetter) {
        this.producerStateGetter = producerStateGetter;
    }

    public StateGetter getConsumerStateGetter() {
        return consumerStateGetter;
    }

    public void setConsumerStateGetter(StateGetter consumerStateGetter) {
        this.consumerStateGetter = consumerStateGetter;
    }

    public void start() {
    }

    public void shutdown() {
        this.scheduledExecutorService.shutdown();
        this.commercialExecutor.shutdown();
    }

    public StatsItem getStatsItem(final String statsName, final String statsKey) {
        try {
            return this.statsTable.get(statsName).getStatsItem(statsKey);
        } catch (Exception e) {
        }

        return null;
    }

    public void onTopicDeleted(final String topic) {
        this.statsManager.onTopicDeleted(topic);
    }
    public void onGroupDeleted(final String group) {
        this.statsManager.onGroupDeleted(group);
    }

    public void incQueuePutNums(final String topic, final Integer queueId) {
        this.statsManager.incQueuePutNums(topic, queueId);
    }

    public void incQueuePutNums(final String topic, final Integer queueId, int num, int times) {
        this.statsManager.incQueuePutNums(topic, queueId, num, times);
    }

    public void incQueuePutSize(final String topic, final Integer queueId, final int size) {
        this.statsManager.incQueuePutSize(topic, queueId, size);
    }

    public void incQueueGetNums(final String group, final String topic, final Integer queueId, final int incValue) {
        this.statsManager.incQueueGetNums(group, topic, queueId, incValue);
    }

    public void incQueueGetSize(final String group, final String topic, final Integer queueId, final int incValue) {
        this.statsManager.incQueueGetSize(group, topic, queueId, incValue);
    }

    public void incConsumerRegisterTime(final int incValue) {
        this.statsManager.incConsumerRegisterTime(incValue);
    }

    public void incProducerRegisterTime(final int incValue) {
        this.statsManager.incProducerRegisterTime(incValue);
    }

    public void incChannelConnectNum() {
        this.statsManager.incChannelConnectNum();
    }

    public void incChannelCloseNum() {
        this.statsManager.incChannelCloseNum();
    }

    public void incChannelExceptionNum() {
        this.statsManager.incChannelExceptionNum();
    }

    public void incChannelIdleNum() {
        this.statsManager.incChannelIdleNum();
    }

    public void incTopicPutNums(final String topic) {
        this.statsManager.incTopicPutNums(topic);
    }

    public void incTopicPutNums(final String topic, int num, int times) {
        this.statsManager.incTopicPutNums(topic, num, times);
    }

    public void incTopicPutSize(final String topic, final int size) {
        this.statsManager.incTopicPutSize(topic, size);
    }

    public void incGroupGetNums(final String group, final String topic, final int incValue) {
        this.statsManager.incGroupGetNums(group, topic, incValue);
    }

    public void incGroupCkNums(final String group, final String topic, final int incValue) {
        this.statsManager.incGroupCkNums(group, topic, incValue);
    }

    public void incGroupAckNums(final String group, final String topic, final int incValue) {
        this.statsManager.incGroupAckNums(group, topic, incValue);
    }

    public String buildStatsKey(String topic, String group) {
        return this.statsManager.buildStatsKey(topic, group);
    }

    public String buildStatsKey(String topic, int queueId) {
        return this.statsManager.buildStatsKey(topic, queueId);
    }

    public String buildStatsKey(String topic, int queueId, String group) {
        return this.statsManager.buildStatsKey(topic, queueId, group);
    }

    public String buildStatsKey(int queueId, String topic, String group) {
        return this.statsManager.buildStatsKey(queueId, topic, group);
    }
    public void incGroupGetSize(final String group, final String topic, final int incValue) {
        this.statsManager.incGroupGetSize(group, topic, incValue);
    }

    public void incGroupGetLatency(final String group, final String topic, final int queueId, final int incValue) {
        this.statsManager.incGroupGetLatency(group, topic, queueId, incValue);
    }

    public void incTopicPutLatency(final String topic, final int queueId, final int incValue) {
        this.statsManager.incTopicPutLatency(topic, queueId, incValue);
    }

    public void incBrokerPutNums() {
        this.statsManager.incBrokerPutNums();
    }

    public void incBrokerPutNums(final String topic, final int incValue) {
        this.statsManager.incBrokerPutNums(topic, incValue);
    }

    public void incBrokerGetNums(final String topic, final int incValue) {
        this.statsManager.incBrokerGetNums(topic, incValue);
    }

    public void incBrokerAckNums(final int incValue) {
        this.statsManager.incBrokerAckNums(incValue);
    }

    public void incBrokerCkNums(final int incValue) {
        this.statsManager.incBrokerCkNums(incValue);
    }

    public void incBrokerGetNumsWithoutSystemTopic(final String topic, final int incValue) {
        this.statsManager.incBrokerGetNumsWithoutSystemTopic(topic, incValue);
    }

    public void incBrokerPutNumsWithoutSystemTopic(final String topic, final int incValue) {
        this.statsManager.incBrokerPutNumsWithoutSystemTopic(topic, incValue);
    }

    public long getBrokerGetNumsWithoutSystemTopic() {
        return this.statsManager.getBrokerGetNumsWithoutSystemTopic();
    }

    public long getBrokerPutNumsWithoutSystemTopic() {
        return this.statsManager.getBrokerPutNumsWithoutSystemTopic();
    }

    public void incSendBackNums(final String group, final String topic) {
        this.statsManager.incSendBackNums(group, topic);
    }

    public double tpsGroupGetNums(final String group, final String topic) {
        return this.statsManager.tpsGroupGetNums(group, topic);
    }

    public void recordDiskFallBehindTime(final String group, final String topic, final int queueId, final long fallBehind) {
        this.statsManager.recordDiskFallBehindTime(group, topic, queueId, fallBehind);
    }

    public void recordDiskFallBehindSize(final String group, final String topic, final int queueId, final long fallBehind) {
        this.statsManager.recordDiskFallBehindSize(group, topic, queueId, fallBehind);
    }

    public void incDLQStatValue(final String key, final String owner, final String group, final String topic, final String type, final int incValue) {
        this.statsManager.incDLQStatValue(key, owner, group, topic, type, incValue);
    }

    public void incCommercialValue(final String key, final String owner, final String group, final String topic, final String type, final long... incValues) {
        this.statsManager.incCommercialValue(key, owner, group, topic, type, incValues);
    }

    public void incAccountValue(final String key, final String accountOwnerParent, final String accountOwnerSelf, final String instanceId, final String group, final String topic, final String msgType, final int incValue) {
        this.statsManager.incAccountValue(key, accountOwnerParent, accountOwnerSelf, instanceId, group, topic, msgType, incValue);
    }

    public void incAccountValue(final String key, final String accountOwnerParent, final String accountOwnerSelf, final String instanceId, final String group, final String topic, final String msgType, final String flowlimitThreshold, final int incValue) {
        this.statsManager.incAccountValue(key, accountOwnerParent, accountOwnerSelf, instanceId, group, topic, msgType, flowlimitThreshold, incValue);
    }

    public String buildCommercialStatsKey(String owner, String topic, String group, String type) {
        return this.statsManager.buildCommercialStatsKey(owner, topic, group, type);
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId, String topic, String group, String msgType) {
        return this.statsManager.buildAccountStatsKey(accountOwnerParent, accountOwnerSelf, instanceId, topic, group, msgType);
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId, String topic, String group, String msgType, String flowlimitThreshold) {
        return this.statsManager.buildAccountStatsKey(accountOwnerParent, accountOwnerSelf, instanceId, topic, group, msgType, flowlimitThreshold);
    }

    public String buildAccountStatKey(final String owner, final String instanceId, final String topic, final String group, final String msgType) {
        return this.statsManager.buildAccountStatKey(owner, instanceId, topic, group, msgType);
    }

    public String[] splitAccountStatKey(final String accountStatKey) {
        return this.statsManager.splitAccountStatKey(accountStatKey);
    }

    private StatisticsKindMeta createStatisticsKindMeta(String name,
        String[] itemNames,
        ScheduledExecutorService executorService,
        StatisticsItemFormatter formatter,
        Logger log,
        long interval) {
        return this.statsManager.createStatisticsKindMeta(name, itemNames, formatter, log, interval);
    }

                new String[] {MSG_NUM},

        boolean online(String instanceId, String group, String topic);
    }

    public enum StatsType {
        // Enum constants
    }

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

    public interface StateGetter {
        // Interface methods
    }

    // Additional methods and classes
    // Additional implementation
}
