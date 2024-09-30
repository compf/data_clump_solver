package org.apache.rocketmq.broker.metrics;

public class MessageCountRequest {
    private final String group;
    private final String topic;
    private final int queueId;
    private final long from;
    private final long to;

    public MessageCountRequest(String group, String topic, int queueId, long from, long to) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
        this.from = from;
        this.to = to;
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

    public long getFrom() {
        return from;
    }

    public long getTo() {
        return to;
    }
}
