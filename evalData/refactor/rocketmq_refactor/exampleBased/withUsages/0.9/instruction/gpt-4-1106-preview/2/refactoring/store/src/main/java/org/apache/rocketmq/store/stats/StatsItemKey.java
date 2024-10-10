package org.apache.rocketmq.store.stats;

public class StatsItemKey {
    private String key;
    private String keyExt;

    public StatsItemKey(String topic, String group) {
        this.key = topic + '@' + group;
    }

    public StatsItemKey(String topic, Integer queueId, String group) {
        this(topic, group);
        this.keyExt = this.key + '@' + queueId;
    }

    public String getKey() {
        return key;
    }

    public String getKeyExt() {
        return keyExt;
    }
}
