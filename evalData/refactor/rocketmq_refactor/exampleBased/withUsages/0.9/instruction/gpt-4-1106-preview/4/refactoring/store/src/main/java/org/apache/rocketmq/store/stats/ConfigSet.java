package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.broker.BrokerConfig;
import org.apache.rocketmq.remoting.netty.NettyClientConfig;
import org.apache.rocketmq.remoting.netty.NettyServerConfig;
import org.apache.rocketmq.store.config.MessageStoreConfig;

public class ConfigSet {
    private String clusterName;
    private boolean enableQueueStat;
    private BrokerConfig brokerConfig;
    private NettyServerConfig nettyServerConfig;
    private NettyClientConfig nettyClientConfig;
    private MessageStoreConfig messageStoreConfig;

    public ConfigSet(BrokerConfig brokerConfig, NettyServerConfig nettyServerConfig, NettyClientConfig nettyClientConfig,
                     MessageStoreConfig messageStoreConfig) {
        this.clusterName = brokerConfig.getBrokerClusterName();
        this.enableQueueStat = brokerConfig.isEnableDetailStat();
        this.brokerConfig = brokerConfig;
        this.nettyServerConfig = nettyServerConfig;
        this.nettyClientConfig = nettyClientConfig;
        this.messageStoreConfig = messageStoreConfig;
    }

    public ConfigSet(String clusterName, boolean enableQueueStat) {
        this.clusterName = clusterName;
        this.enableQueueStat = enableQueueStat;
    }

    public String getClusterName() {
        return this.clusterName;
    }

    public boolean isEnableQueueStat() {
        return this.enableQueueStat;
    }

    // Getters for other configurations...
}
