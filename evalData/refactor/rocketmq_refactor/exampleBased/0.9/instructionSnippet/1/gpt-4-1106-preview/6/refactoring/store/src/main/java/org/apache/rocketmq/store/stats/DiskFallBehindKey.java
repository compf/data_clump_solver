package org.apache.rocketmq.store.stats;

class DiskFallBehindKey {
    private String group;
    private String topic;
    private int queueId;

    DiskFallBehindKey(String group, String topic, int queueId) {
        this.group = group;
        this.topic = topic;
        this.queueId = queueId;
    }

    public String buildStatsKey() {
        return String.format("%s %s %d", this.topic, this.group, this.queueId);
    }
}