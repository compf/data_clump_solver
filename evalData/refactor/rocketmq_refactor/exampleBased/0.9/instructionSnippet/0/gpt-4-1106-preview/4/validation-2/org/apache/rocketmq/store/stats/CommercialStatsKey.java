package org.apache.rocketmq.store.stats;

public class CommercialStatsKey {
    private final String owner;
    private final String topic;
    private final String group;
    private final String type;

    public CommercialStatsKey(String owner, String topic, String group, String type) {
        this.owner = owner;
        this.topic = topic;
        this.group = group;
        this.type = type;
    }

    @Override
    public String toString() {
        return String.format("%s@%s@%s@%s", owner, topic, group, type);
    }
}