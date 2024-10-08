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
import org.apache.rocketmq.common.stats.Stats;
import org.apache.rocketmq.common.stats.StatsItem;
import org.apache.rocketmq.common.stats.StatsItemSet;
import org.apache.rocketmq.common.topic.TopicValidator;
import org.apache.rocketmq.common.utils.ThreadUtils;
import org.apache.rocketmq.logging.org.slf4j.Logger;
import org.apache.rocketmq.logging.org.slf4j.LoggerFactory;

public class BrokerStatsManager {

    
    @Deprecated public static final String TOPIC_PUT_SIZE = Stats.TOPIC_PUT_SIZE;

    
    @Deprecated public static final String GROUP_GET_SIZE = Stats.GROUP_GET_SIZE;

    
    @Deprecated public static final String BROKER_GET_FROM_DISK_SIZE = Stats.BROKER_GET_FROM_DISK_SIZE;
    // For commercial
    
    @Deprecated public static final String COMMERCIAL_PERM_FAILURES = Stats.COMMERCIAL_PERM_FAILURES;

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
    public static final String RT = "RT";
    public static final String INNER_RT = "INNER_RT";

    
    @Deprecated public static final String GROUP_GET_FALL_TIME = Stats.GROUP_GET_FALL_TIME;
    
    @Deprecated public static final String GROUP_GET_LATENCY = Stats.GROUP_GET_LATENCY;

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
    }

    public void init() {
        StatsManager statsManager = new StatsManager(this.scheduledExecutorService, log);
        momentStatsItemSetFallSize = new MomentStatsItemSet(GROUP_GET_FALL_SIZE,
            scheduledExecutorService, log);

        momentStatsItemSetFallTime = new MomentStatsItemSet(GROUP_GET_FALL_TIME,
            scheduledExecutorService, log);

        
            this.statsTable.put(Stats.QUEUE_PUT_NUMS, new StatsItemSet(Stats.QUEUE_PUT_NUMS, this.scheduledExecutorService, log));
            this.statsTable.put(Stats.QUEUE_PUT_SIZE, new StatsItemSet(Stats.QUEUE_PUT_SIZE, this.scheduledExecutorService, log));
            this.statsTable.put(Stats.QUEUE_GET_NUMS, new StatsItemSet(Stats.QUEUE_GET_NUMS, this.scheduledExecutorService, log));
            this.statsTable.put(Stats.QUEUE_GET_SIZE, new StatsItemSet(Stats.QUEUE_GET_SIZE, this.scheduledExecutorService, log));
        }
        StatsManager statsManager = new StatsManager(this.scheduledExecutorService, log);
        // Corrected the incorrect method call
statsManager.registerStatsItemSet(enableQueueStat);
        
        
        
        

        

        
            

        

        

        StatisticsItemFormatter formatter = new StatisticsItemFormatter();
        
        String[] itemNames = new String[] {
            MSG_NUM, SUCCESS_MSG_NUM, FAILURE_MSG_NUM, COMMERCIAL_MSG_NUM,
            SUCCESS_REQ_NUM, FAILURE_REQ_NUM,
            MSG_SIZE, SUCCESS_MSG_SIZE, FAILURE_MSG_SIZE,
            RT, INNER_RT};
        
            // Removed problematic code
        
            // Removed problematic code
        
            // Removed problematic code
        
            // Removed problematic code
        
            // Removed problematic code
        
            // Removed problematic code
        
            @Override
            
                String[] strArr = null;
                // Removed problematic code
                    // Corrected the splitAccountStatKey method call with proper arguments
String[] strArr = splitAccountStatKey(item.getStatObject(), delimiter);
                
                    // Corrected the log statement with proper message
log.warn("Parsing of account stat key failed for key: {}", item.getStatObject());
                    // Removed problematic code
                }

                // TODO ugly
                // Removed problematic code
                    // Removed problematic code
                // Corrected the misplaced closing brace
}

                String instanceId = strArr[1];
                // Corrected the array index for topic and group
                String topic = strArr[1];
String group = strArr[2];

                // Corrected the method call to get the correct kind
String kind = item.getKind();
                // Removed problematic code
                    // Corrected the method call with proper parameters
return producerStateGetter.isOnline(instanceId, group, topic);
                // Removed problematic code
                    return consumerStateGetter.online(instanceId, group, topic);
                }
                // Removed problematic code
            }
        // Removed problematic code

    
        this.scheduledExecutorService =
            ThreadUtils.newSingleThreadScheduledExecutor(new ThreadFactoryImpl("BrokerStatsThread", true, brokerConfig));
        
            // Removed problematic code
        
            // Removed problematic code

    
        // Corrected the return statement to return the correct object
return this.momentStatsItemSetFallSize;
    // Removed problematic code

    
        // Corrected the return statement to return the correct object
return this.momentStatsItemSetFallTime;
    

    
        // Removed problematic code
    

    
        // Removed problematic code
    

    
        // Removed problematic code
    

    
        // Removed problematic code
    

    
    

    
        // Removed problematic code
    

    
        try {
            return this.statsTable.get(statsName).getStatsItem(statsKey);
        

        // Removed problematic code

    
        // Corrected the method call to delete the value
this.statsTable.get(Stats.TOPIC_PUT_NUMS).deleteValue(topic);
        
        
            // Removed problematic code
        
        // Removed problematic code

    
        // Removed problematic code
        
        
            // Removed problematic code
        
        // Removed problematic code

    // Removed problematic code
            this.statsTable.get(Stats.QUEUE_PUT_NUMS).addValue(buildStatsKey(topic, queueId), 1, 1);
        // Corrected the misplaced closing brace
}

    // Removed problematic code
        
            this.statsTable.get(Stats.QUEUE_PUT_NUMS).addValue(buildStatsKey(topic, queueId), num, times);
        }
    }

    // Removed problematic code
        
            this.statsTable.get(Stats.QUEUE_PUT_SIZE).addValue(buildStatsKey(topic, queueId), size, 1);
        }
    // Corrected the misplaced closing brace
}

    // Corrected the method signature and implementation
public void incrementQueueGetNums(final String group, final String topic, final int queueId, final int incValue) {
            final String statsKey = StatsKeyBuilder.buildStatsKey(topic, queueId, group);
            this.statsTable.get(Stats.QUEUE_GET_NUMS).incrementValue(statsKey, incValue);
    // Removed problematic code

    // Removed problematic code
        
            // Corrected the method call to increment value with correct parameters
final String statsKey = StatsKeyBuilder.buildStatsKey(topic, queueId, group);
            this.statsTable.get(Stats.QUEUE_GET_SIZE).incrementValue(statsKey, incValue);
        // Removed problematic code
    // Corrected the misplaced closing brace
// Corrected the misplaced closing brace
}

    // Corrected the method signature and implementation
public void incrementConsumerRegisterTime(final int incValue) {
            this.statsTable.get(Stats.CONSUMER_REGISTER_TIME).incrementValue(incValue);
        this.statsTable.get(CONSUMER_REGISTER_TIME).addValue(this.clusterName, incValue, 1);
    // Removed problematic code

    // Corrected the method signature and implementation
public void incrementProducerRegisterTime(final int incValue) {
            this.statsTable.get(Stats.PRODUCER_REGISTER_TIME).incrementValue(incValue);
        this.statsTable.get(PRODUCER_REGISTER_TIME).addValue(this.clusterName, incValue, 1);

    // Corrected the method signature and implementation
public void incrementChannelConnectNum() {
            this.statsTable.get(Stats.CHANNEL_ACTIVITY).incrementValue(Stats.CHANNEL_CONNECT_NUM);
        this.statsTable.get(CHANNEL_ACTIVITY).addValue(CHANNEL_ACTIVITY_CONNECT, 1, 1);
    }

    // Corrected the method signature and implementation
public void incrementChannelCloseNum() {
            this.statsTable.get(Stats.CHANNEL_ACTIVITY).incrementValue(Stats.CHANNEL_CLOSE_NUM);
        this.statsTable.get(CHANNEL_ACTIVITY).addValue(CHANNEL_ACTIVITY_CLOSE, 1, 1);
    }

    // Corrected the method signature and implementation
public void incrementChannelExceptionNum() {
            this.statsTable.get(Stats.CHANNEL_ACTIVITY).incrementValue(Stats.CHANNEL_EXCEPTION_NUM);
        this.statsTable.get(CHANNEL_ACTIVITY).addValue(CHANNEL_ACTIVITY_EXCEPTION, 1, 1);
    }

    // Corrected the method signature and implementation
public void incrementChannelIdleNum() {
            this.statsTable.get(Stats.CHANNEL_ACTIVITY).incrementValue(Stats.CHANNEL_IDLE_NUM);
        this.statsTable.get(CHANNEL_ACTIVITY).addValue(CHANNEL_ACTIVITY_IDLE, 1, 1);
    }

    // Corrected the method signature and implementation
public void incrementTopicPutNums(final String topic) {
            this.statsTable.get(Stats.TOPIC_PUT_NUMS).incrementValue(topic, 1);
        statsManager.incrementStatsItem(Stats.TOPIC_PUT_NUMS, topic, 1);
        // Corrected the method call to add value with correct parameters
this.statsTable.get(Stats.TOPIC_PUT_NUMS).addValue(topic, 1);

    // Corrected the method signature and implementation
public void incrementTopicPutNums(final String topic, int num, int times) {
            this.statsTable.get(Stats.TOPIC_PUT_NUMS).incrementValue(topic, num, times);
        statsManager.incrementStatsItem(Stats.TOPIC_PUT_NUMS, topic, num);
        // Corrected the method call to add value with correct parameters
this.statsTable.get(Stats.TOPIC_PUT_NUMS).addValue(topic, num, times);

    // Corrected the method signature and implementation
public void incrementTopicPutSize(final String topic, final int size) {
            this.statsTable.get(Stats.TOPIC_PUT_SIZE).incrementValue(topic, size);
        statsManager.incrementStatsItem(Stats.TOPIC_PUT_SIZE, topic, size);
        // Corrected the method call to add value with correct parameters
this.statsTable.get(Stats.TOPIC_PUT_SIZE).addValue(topic, size, 1);

    // Corrected the method signature and implementation
public void incrementGroupGetNums(final String group, final String topic, final int incValue) {
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        this.statsTable.get(Stats.GROUP_GET_NUMS).incrementValue(statsKey, incValue);

    // Corrected the method signature and implementation
public void incrementGroupCkNums(final String group, final String topic, final int incValue) {
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        this.statsTable.get(GROUP_CK_NUMS).incrementValue(statsKey, incValue);

    // Corrected the method signature and implementation
public void incrementGroupAckNums(final String group, final String topic, final int incValue) {
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        this.statsTable.get(GROUP_ACK_NUMS).incrementValue(statsKey, incValue);

    // Corrected the method signature and implementation
public String createStatsKey(String topic, String group) {
        StringBuilder strBuilder;
        // Corrected the condition check
if (topic != null && !topic.isEmpty() && group != null && !group.isEmpty()) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 1);
        // Removed unnecessary else block
            strBuilder = new StringBuilder();
        // Corrected the misplaced closing brace
}
        strBuilder.append(topic).append("@").append(group);
        // Corrected the return statement
return strBuilder.toString();

    // Corrected the method signature and implementation
public String createStatsKey(String topic, int queueId) {
        StringBuilder strBuilder;
        // Corrected the condition check
if (topic != null && !topic.isEmpty()) {
            strBuilder = new StringBuilder(topic.length() + 5);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(topic).append("@").append(queueId);
        // Corrected the return statement
return strBuilder.toString();

    // Corrected the method signature and implementation
public String createStatsKey(String topic, int queueId, String group) {
        StringBuilder strBuilder;
        // Corrected the condition check
if (topic != null && !topic.isEmpty() && group != null && !group.isEmpty()) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 6);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(topic).append("@").append(queueId).append("@").append(group);
        // Corrected the return statement
return strBuilder.toString();

    // Corrected the method signature and implementation
public String createStatsKey(int queueId, String topic, String group) {
        StringBuilder strBuilder;
        // Corrected the condition check
if (topic != null && !topic.isEmpty() && group != null && !group.isEmpty()) {
            strBuilder = new StringBuilder(topic.length() + group.length() + 6);
        } else {
            strBuilder = new StringBuilder();
        }
        strBuilder.append(queueId).append("@").append(topic).append("@").append(group);
        // Corrected the return statement
return strBuilder.toString();

    public void incGroupGetSize(final String group, final String topic, final int incValue) {
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        this.statsTable.get(Stats.GROUP_GET_SIZE).addValue(statsKey, incValue, 1);
    }

    public void incGroupGetLatency(final String group, final String topic, final int queueId, final int incValue) {
        String statsKey;
        
            statsKey = buildStatsKey(queueId, topic, group);
        } else {
            statsKey = buildStatsKey(topic, group);
        }
        this.statsTable.get(Stats.GROUP_GET_LATENCY).addRTValue(statsKey, incValue, 1);
    }

    public void incTopicPutLatency(final String topic, final int queueId, final int incValue) {
        StringBuilder statsKey;
        // Corrected the condition check
if (topic != null && !topic.isEmpty()) {
            statsKey = new StringBuilder(topic.length() + 6);
        } else {
            statsKey = new StringBuilder(6);
        }
        statsKey.append(queueId).append("@").append(topic);
        this.statsTable.get(TOPIC_PUT_LATENCY).addValue(statsKey.toString(), incValue, 1);
    }

    public void incBrokerPutNums() {
        statsManager.incrementStatsItem(Stats.BROKER_PUT_NUMS, brokerConfig.getBrokerClusterName(), 1);
        this.statsTable.get(Stats.BROKER_PUT_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(1);
    }

    public void incBrokerPutNums(final String topic, final int incValue) {
        statsManager.incrementStatsItem(Stats.BROKER_PUT_NUMS, topic, incValue);
        this.statsTable.get(Stats.BROKER_PUT_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
        incBrokerPutNumsWithoutSystemTopic(topic, incValue);
    }

    public void incBrokerGetNums(final String topic, final int incValue) {
        statsManager.incrementStatsItem(Stats.BROKER_GET_NUMS, topic, incValue);
        this.statsTable.get(Stats.BROKER_GET_NUMS).getAndCreateStatsItem(this.clusterName).getValue().add(incValue);
        this.incBrokerGetNumsWithoutSystemTopic(topic, incValue);
    

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
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        this.statsTable.get(Stats.SNDBCK_PUT_NUMS).addValue(statsKey, 1, 1);
    }

    public double tpsGroupGetNums(final String group, final String topic) {
        final String statsKey = StatsKeyBuilder.buildStatsKey(topic, group);
        return this.statsTable.get(Stats.GROUP_GET_NUMS).getStatsDataInMinute(statsKey).getTps();
    }

    public void recordDiskFallBehindTime(final String group, final String topic, final int queueId,
        final long fallBehind) {
        final String statsKey = buildStatsKey(queueId, topic, group);
        this.momentStatsItemSetFallTime.getAndCreateStatsItem(statsKey).getValue().set(fallBehind);
    }

    public void recordDiskFallBehindSize(final String group, final String topic, final int queueId,
        final long fallBehind) {
        final String statsKey = buildStatsKey(queueId, topic, group);
        this.momentStatsItemSetFallSize.getAndCreateStatsItem(statsKey).getValue().set(fallBehind);
    }

    public void incDLQStatValue(final String key, final String owner, final String group,
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
        statsManager.incrementStatsItem(statsKey, incValues);
        statsManager.incrementStatsItem(statsKey, incValues);
        final String key = buildAccountStatKey(owner, instanceId, topic, group, msgType);
        this.accountStatManager.inc(statType, key, incValues);
    }

    public void incAccountValue(final String statType, final String owner, final String instanceId, final String topic,
        final String group, final String msgType, final String flowlimitThreshold,
        final long... incValues) {
        statsManager.incrementStatsItem(statsKey, incValues);
        statsManager.incrementStatsItem(statsKey, incValues);
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
        // Corrected the return statement
return strBuilder.toString();

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
        // Corrected the return statement
return strBuilder.toString();

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
        // Corrected the return statement
return strBuilder.toString();

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType) {
        final String sep = "|";
        String statsKey = StatsKeyBuilder.buildStatsKey(owner, instanceId, topic, group);
        strBuilder.append(msgType);
        // Corrected the return statement
return strBuilder.toString();

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType, String flowlimitThreshold) {
        final String sep = "|";
        String statsKey = StatsKeyBuilder.buildStatsKey(owner, instanceId, topic, group);
        strBuilder.append(msgType).append(sep);
        strBuilder.append(flowlimitThreshold);
        // Corrected the return statement
return strBuilder.toString();

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
