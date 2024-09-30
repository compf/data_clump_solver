package org.apache.rocketmq.broker.metrics;

class ConsumerLagKey {
    private String group;
    private String topic;
    private int queueId;

    ConsumerLagKey(String group, String topic, int queueId) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
    }

    public String getTopic() {
        return topic;
    }

    public int getQueueId() {
        return queueId;
    }
}