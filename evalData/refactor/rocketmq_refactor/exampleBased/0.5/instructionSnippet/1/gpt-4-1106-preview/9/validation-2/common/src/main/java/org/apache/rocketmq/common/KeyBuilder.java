package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildRetryTopicV1(String topic, String groupName) {
        // Implementation of building retry topic V1
        return groupName + "%RETRY%" + topic;
    }

    public static String buildRetryTopicV2(String topic, String groupName) {
        // Implementation of building retry topic V2
        return groupName + "%RETRY%V2%" + topic;
    }

    // Assuming new methods are implemented
    public static String parseNormalTopic(String retryTopic, String group) {
        // Implementation of parsing normal topic
        return retryTopic.replace(group, "").replace("%RETRY%", "").replace("%RETRY%V2%", "");
    }

    public static String parseGroup(String retryTopic) {
        // Implementation of parsing group
        return retryTopic.split("%RETRY%")[0];
    }

    public static boolean isRetryTopicV2(String retryTopic) {
        // Implementation of checking if it's a retry topic V2
        return retryTopic.contains("%RETRY%V2%");
    }

    // Other methods...
}