package org.apache.rocketmq.store.stats;

public class BrokerStatsItem {
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
