package org.apache.rocketmq.store.stats;

public class BrokerStatsItem {
    public static final String GROUP_GET_FALL_SIZE = "GROUP_GET_FALL_SIZE";
    public static final String GROUP_GET_FALL_TIME = "GROUP_GET_FALL_TIME";
    public static final String QUEUE_PUT_NUMS = "QUEUE_PUT_NUMS";
    public static final String QUEUE_PUT_SIZE = "QUEUE_PUT_SIZE";
    public static final String QUEUE_GET_NUMS = "QUEUE_GET_NUMS";
    public static final String QUEUE_GET_SIZE = "QUEUE_GET_SIZE";
    public static final String TOPIC_PUT_NUMS = "TOPIC_PUT_NUMS";
    public static final String TOPIC_PUT_SIZE = "TOPIC_PUT_SIZE";
    public static final String GROUP_GET_NUMS = "GROUP_GET_NUMS";
    public static final String GROUP_GET_SIZE = "GROUP_GET_SIZE";
    public static final String SNDBCK_PUT_NUMS = "SNDBCK_PUT_NUMS";
    public static final String BROKER_PUT_NUMS = "BROKER_PUT_NUMS";
    public static final String BROKER_GET_NUMS = "BROKER_GET_NUMS";
    public static final String GROUP_GET_FROM_DISK_NUMS = "GROUP_GET_FROM_DISK_NUMS";
    public static final String GROUP_GET_FROM_DISK_SIZE = "GROUP_GET_FROM_DISK_SIZE";
    public static final String BROKER_GET_FROM_DISK_NUMS = "BROKER_GET_FROM_DISK_NUMS";
    public static final String BROKER_GET_FROM_DISK_SIZE = "BROKER_GET_FROM_DISK_SIZE";
    public static final String COMMERCIAL_SEND_TIMES = "COMMERCIAL_SEND_TIMES";
    public static final String COMMERCIAL_SNDBCK_TIMES = "COMMERCIAL_SNDBCK_TIMES";
    public static final String COMMERCIAL_RCV_TIMES = "COMMERCIAL_RCV_TIMES";
    public static final String COMMERCIAL_RCV_EPOLLS = "COMMERCIAL_RCV_EPOLLS";
    public static final String COMMERCIAL_SEND_SIZE = "COMMERCIAL_SEND_SIZE";
    public static final String COMMERCIAL_RCV_SIZE = "COMMERCIAL_RCV_SIZE";
    public static final String COMMERCIAL_PERM_FAILURES = "COMMERCIAL_PERM_FAILURES";
    public static final String GROUP_ACK_NUMS = "GROUP_ACK_NUMS";
    public static final String GROUP_CK_NUMS = "GROUP_CK_NUMS";
    public static final String GROUP_GET_LATENCY = "GROUP_GET_LATENCY";
    public static final String TOPIC_PUT_LATENCY = "TOPIC_PUT_LATENCY";
    public static final String DLQ_PUT_NUMS = "DLQ_PUT_NUMS";
    public static final String BROKER_ACK_NUMS = "BROKER_ACK_NUMS";
    public static final String BROKER_CK_NUMS = "BROKER_CK_NUMS";
    public static final String BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC = "BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC";
    public static final String SNDBCK2DLQ_TIMES = "SNDBCK2DLQ_TIMES";
    public static final String CONSUMER_REGISTER_TIME = "CONSUMER_REGISTER_TIME";

    private final String group;
    private final String topic;
    private final int queueId;
    private final long fallBehind;

    public BrokerStatsItem(String group, String topic, int queueId, long fallBehind) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
        this.fallBehind = fallBehind;
    }

    public String getStatsKey() {
        return buildStatsKey(queueId, topic, group);
    }

    public long getFallBehind() {
        return fallBehind;
    }

    private String buildStatsKey(int queueId, String topic, String group) {
        // Implementation of building the stats key
        return String.format("%s-%s-%d", group, topic, queueId);
    }
}
