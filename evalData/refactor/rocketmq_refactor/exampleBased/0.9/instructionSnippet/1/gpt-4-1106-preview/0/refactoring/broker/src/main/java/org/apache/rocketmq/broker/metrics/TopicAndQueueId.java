package org.apache.rocketmq.broker.metrics;

public class TopicAndQueueId {
    public final String topic;
    public final int queueId;

    public TopicAndQueueId(String topic, int queueId) {
        this.topic = topic;
        this.queueId = queueId;
    }
}