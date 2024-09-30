package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(int queueId, String topic, String group) {
        // Implementation of key building logic
        return group + "#" + topic + "#" + queueId;
    }

}