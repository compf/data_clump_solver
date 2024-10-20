package org.apache.rocketmq.store.stats;

public class DiskFallBehindKey {
    private String group;
    private String topic;
    private int queueId;

    public DiskFallBehindKey(String group, String topic, int queueId) {
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
}
