package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.stats.StatsItemSet;
import org.apache.rocketmq.common.stats.MomentStatsItemSet;
import org.apache.rocketmq.logging.InternalLogger;
import org.apache.rocketmq.logging.InternalLoggerFactory;
import org.apache.rocketmq.store.config.StorePathConfigHelper;
import org.apache.rocketmq.store.stats.BrokerStats;
import org.apache.rocketmq.store.stats.BrokerStatsManager;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ScheduledExecutorService;

public class BrokerStatsManager {
    private static final InternalLogger log = InternalLoggerFactory.getLogger(LoggerName.STORE_LOGGER_NAME);
    private final ConcurrentMap<String, BrokerStats> brokerStatsTable = new ConcurrentHashMap<String, BrokerStats>();
    private final ScheduledExecutorService scheduledExecutorService;

    public BrokerStatsManager(ScheduledExecutorService scheduledExecutorService) {
        this.scheduledExecutorService = scheduledExecutorService;
    }

    public void start() {
        this.scheduledExecutorService.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                try {
                    BrokerStatsManager.this.persist();
                } catch (Throwable e) {
                    log.error("BrokerStatsManager persist failed", e);
                }
            }
        }, 1000 * 10, StorePathConfigHelper.getBrokerStatsCommitInterval(), TimeUnit.MILLISECONDS);
    }

    public void shutdown() {
        this.scheduledExecutorService.shutdown();
    }

    public void record(String statsName, long value, int times) {
        BrokerStats brokerStats = this.brokerStatsTable.get(statsName);
        if (null == brokerStats) {
            brokerStats = new BrokerStats();
            BrokerStats prev = this.brokerStatsTable.putIfAbsent(statsName, brokerStats);
            brokerStats = prev != null ? prev : brokerStats;
        }

        brokerStats.record(value, times);
    }

    private void persist() {
        for (BrokerStats brokerStats : this.brokerStatsTable.values()) {
            brokerStats.persist();
        }
    }
}
