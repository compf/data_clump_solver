package org.apache.rocketmq.store.stats;

public class DiskFallBehindMetrics {
    private String group;
    private String topic;
    private int queueId;
    private long fallBehind;

    public DiskFallBehindMetrics(String group, String topic, int queueId, long fallBehind) {
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