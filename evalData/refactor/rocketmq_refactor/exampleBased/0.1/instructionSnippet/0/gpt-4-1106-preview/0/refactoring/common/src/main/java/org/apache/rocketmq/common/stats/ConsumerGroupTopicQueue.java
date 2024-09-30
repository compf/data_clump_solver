package org.apache.rocketmq.common.stats;

public class ConsumerGroupTopicQueue {
    private final String group;
    private final String topic;
    private final int queueId;

    public ConsumerGroupTopicQueue(String group, String topic, int queueId) {
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
