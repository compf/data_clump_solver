package org.apache.rocketmq.common;

public class TopicQueueGroup {
    private final String topic;
    private final int queueId;
    private final String group;

    public TopicQueueGroup(String topic, int queueId, String group) {
        this.topic = topic;
        this.queueId = queueId;
        this.group = group;
    }

    public String getTopic() {
        return topic;
    }

    public int getQueueId() {
        return queueId;
    }

    public String getGroup() {
        return group;
    }

    @Override
    public String toString() {
        return "TopicQueueGroup{" +
            "topic='" + topic + '\'' +
            ", queueId=" + queueId +
            ", group='" + group + '\'' +
            '}';
    }
}
