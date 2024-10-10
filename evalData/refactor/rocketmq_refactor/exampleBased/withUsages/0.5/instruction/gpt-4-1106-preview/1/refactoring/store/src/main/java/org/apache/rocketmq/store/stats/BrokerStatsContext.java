package org.apache.rocketmq.store.stats;

public class BrokerStatsContext {

    private final String clusterName;
    private final boolean enableQueueStat;

    public BrokerStatsContext(String clusterName, boolean enableQueueStat) {
        this.clusterName = clusterName;
        this.enableQueueStat = enableQueueStat;
    }

    public String getClusterName() {
        return clusterName;
    }

    public boolean isEnableQueueStat() {
        return enableQueueStat;
    }
}