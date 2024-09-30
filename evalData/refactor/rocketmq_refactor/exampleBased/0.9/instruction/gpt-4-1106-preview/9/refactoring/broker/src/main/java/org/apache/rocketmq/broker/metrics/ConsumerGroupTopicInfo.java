package org.apache.rocketmq.broker.metrics;

public class ConsumerGroupTopicInfo {
    private String group;
    private String topic;
    private boolean isRetry;

    public ConsumerGroupTopicInfo(String group, String topic, boolean isRetry) {
        this.group = group;
        this.topic = topic;
        this.isRetry = isRetry;
    }

    public String getGroup() {
        return group;
    }

    public String getTopic() {
        return topic;
    }

    public boolean isRetry() {
        return isRetry;
    }
}