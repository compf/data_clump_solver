package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(final int queueId, final String topic, final String group) {
        // Implementation of building the stats key based on queueId, topic, and group
        // This is a placeholder implementation
        return topic + "-" + queueId + "-" + group;
    }

}