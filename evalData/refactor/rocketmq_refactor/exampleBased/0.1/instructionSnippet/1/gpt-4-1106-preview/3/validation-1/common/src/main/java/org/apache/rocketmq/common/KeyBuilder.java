package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(int queueId, String topic, String group) {
        return group + "@" + topic + "@" + queueId;
    }

    // Added methods to handle retry topics
    public static String buildRetryTopic(String topic, String groupName, int version) {
        switch (version) {
            case 1:
                return topic + "RETRY" + groupName;
            case 2:
                return topic + "RETRY_V2" + groupName;
            default:
                throw new IllegalArgumentException("Unsupported version for retry topic: " + version);
        }
    }

}