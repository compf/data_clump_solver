package org.apache.rocketmq.broker.metrics;

public class ConsumerLagKey {
    private String group;
    private String topic;
    private int queueId;
    private boolean isPop;

    public ConsumerLagKey(String group, String topic, int queueId, boolean isPop) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
        this.isPop = isPop;
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

    public boolean isPop() {
        return isPop;
    }
}