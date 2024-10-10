package org.apache.rocketmq.store.stats;

public class BrokerClusterInfo {
    private final String clusterName;

    public BrokerClusterInfo(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getClusterName() {
        return clusterName;
    }
}
