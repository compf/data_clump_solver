package org.apache.rocketmq.store.stats;

class StatsKeyBuilder {

    static String buildStatsKey(String topic, String group, int queueId) {
        return topic + "-" + group + "-" + queueId;
    }

}