package org.apache.rocketmq.common;

public class KeyBuilder {

    // Corrected method names
    public static String buildRetryTopicV1(String topic, String groupName) {
        // Implementation of building retry topic V1
        // This is a placeholder for actual implementation
        return groupName + "%RETRY%" + topic;
    }

    public static String buildRetryTopicV2(String topic, String groupName) {
        // Implementation of building retry topic V2
        // This is a placeholder for actual implementation
        return groupName + "%RETRY%V2%" + topic;
    }

    // Other methods...
}