package org.apache.rocketmq.common.stats;

public class ConsumerLag {
    private final String group;
    private final String topic;
    private final int queueId;
    private final long from;
    private final long to;
    private final boolean isPop;

    public ConsumerLag(String group, String topic, int queueId, long from, long to, boolean isPop) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
        this.from = from;
        this.to = to;
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

    public long getFrom() {
        return from;
    }

    public long getTo() {
        return to;
    }

    public boolean isPop() {
        return isPop;
    }
}
