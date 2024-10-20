package org.apache.rocketmq.common.stats;

public class StatsKey {
    private final String group;
    private final String topic;
    private final int queueId;

    public StatsKey(String group, String topic, int queueId) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
    }

    public String getGroup() {
        return group;
    }

    public String getTopic() {
        return topic;
    }

    public int getQueueId() {
        return queueId;
    }

    public String buildStatsKey() {
        return group + "#" + topic + "#" + queueId;
    }
}