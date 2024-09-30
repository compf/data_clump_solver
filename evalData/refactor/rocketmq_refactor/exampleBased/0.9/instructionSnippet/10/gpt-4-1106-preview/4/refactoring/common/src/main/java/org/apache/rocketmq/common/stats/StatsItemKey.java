package org.apache.rocketmq.common.stats;

public enum StatsItemKey {
    QUEUE_PUT_NUMS("QUEUE_PUT_NUMS"),
    // Other constants
    GROUP_GET_FALL_TIME("GROUP_GET_FALL_TIME");

    private final String key;

    StatsItemKey(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
