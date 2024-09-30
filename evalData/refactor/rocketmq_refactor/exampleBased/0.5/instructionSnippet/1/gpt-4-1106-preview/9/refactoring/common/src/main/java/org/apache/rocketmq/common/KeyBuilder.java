package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(int queueId, String topic, String group) {
        // Implementation of building stats key
        // This is a placeholder for actual implementation
        return group + "#" + topic + "#" + queueId;
    }

}