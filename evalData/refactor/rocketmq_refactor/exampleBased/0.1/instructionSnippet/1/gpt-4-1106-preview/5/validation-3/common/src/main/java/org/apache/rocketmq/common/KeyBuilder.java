package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildPopRetryTopicV1(String topic, String groupName) {
        // Implementation of buildPopRetryTopicV1
        return groupName + "%RETRY%" + topic;
    }

    public static String buildPopRetryTopicV2(String topic, String groupName) {
        // Implementation of buildPopRetryTopicV2
        return groupName + "%RETRY%V2%" + topic;
    }

}