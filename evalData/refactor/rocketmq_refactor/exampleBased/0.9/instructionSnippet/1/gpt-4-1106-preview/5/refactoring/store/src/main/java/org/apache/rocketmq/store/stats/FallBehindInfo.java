package org.apache.rocketmq.store.stats;

public class FallBehindInfo {
    private final String group;
    private final String topic;
    private final int queueId;
    private final long fallBehind;

    public FallBehindInfo(String group, String topic, int queueId, long fallBehind) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
        this.fallBehind = fallBehind;
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

    public long getFallBehind() {
        return fallBehind;
    }
}