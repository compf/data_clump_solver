package org.apache.rocketmq.common;

public class KeyBuilder {

    public static String buildStatsKey(int queueId, String topic, String group) {
        return group + "@" + topic + "@" + queueId;
    }

}