package org.apache.rocketmq.broker.metrics;

public class ConsumerLagStatsRequest {
    private final String group;
    private final String topic;
    private final int queueId;
    private final boolean isPop;

    public ConsumerLagStatsRequest(String group, String topic, int queueId, boolean isPop) {
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
