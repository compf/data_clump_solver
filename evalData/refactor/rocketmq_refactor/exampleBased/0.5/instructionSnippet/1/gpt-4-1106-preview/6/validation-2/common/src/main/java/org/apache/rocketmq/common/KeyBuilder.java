package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(final int queueId, final String topic, final String group) {
        // Implementation of building the stats key based on queueId, topic, and group
        // This is a placeholder implementation
        return topic + "-" + queueId + "-" + group;
    }

    public static String buildPopRetryTopicV1(String topic, String groupName) {
        // Implementation of building the retry topic for V1
        // This is a placeholder implementation
        return "RETRY_" + groupName + "_" + topic;
    }

    public static String buildPopRetryTopicV2(String topic, String groupName) {
        // Implementation of building the retry topic for V2
        // This is a placeholder implementation
        return "RETRY_V2_" + groupName + "_" + topic;
    }

}