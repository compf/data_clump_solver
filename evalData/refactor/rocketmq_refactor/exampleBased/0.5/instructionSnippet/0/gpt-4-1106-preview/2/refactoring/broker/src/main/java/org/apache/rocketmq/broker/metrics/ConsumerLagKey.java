package org.apache.rocketmq.broker.metrics;

public class ConsumerLagKey {
    private String group;
    private String topic;
    private int queueId;

    public ConsumerLagKey(String group, String topic, int queueId) {
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

    // Additional functionality can be added here such as equals, hashCode, or other methods
    // that operate on the group, topic, and queueId.
}