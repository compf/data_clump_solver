package org.apache.rocketmq.common.stats;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.rocketmq.logging.InternalLogger;

public class StatsManager {

    private final ConcurrentHashMap<String, StatsItemSet> statsTable = new ConcurrentHashMap<>();

    public void registerStatsItemSet(String statsKey, ScheduledExecutorService scheduledExecutorService, InternalLogger log) {
        statsTable.put(statsKey, new StatsItemSet(statsKey, scheduledExecutorService, log));
    }

    // Other methods for managing statistics might be added here.

}