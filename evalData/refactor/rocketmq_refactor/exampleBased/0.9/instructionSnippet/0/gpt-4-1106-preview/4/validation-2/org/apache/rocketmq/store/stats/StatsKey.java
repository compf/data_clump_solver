package org.apache.rocketmq.store.stats;

public class StatsKey {
    private final int queueId;
    private final String topic;
    private final String group;

    public StatsKey(int queueId, String topic, String group) {
        this.queueId = queueId;
        this.topic = topic;
        this.group = group;
    }

    @Override
    public String toString() {
        return String.format("%d@%s@%s", queueId, topic, group);
    }
}