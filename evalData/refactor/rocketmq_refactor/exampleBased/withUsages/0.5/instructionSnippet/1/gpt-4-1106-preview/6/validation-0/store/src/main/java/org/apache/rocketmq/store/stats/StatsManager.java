package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.stats.Stats;

public class StatsManager {

    private String clusterName;

    public StatsManager(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getClusterName() {
        return clusterName;
    }

    // Other methods related to statistics management
}