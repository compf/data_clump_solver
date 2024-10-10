package org.apache.rocketmq.common.stats;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;

public class StatsManager {

    private final ConcurrentHashMap<String, StatsItemSet> statsTable = new ConcurrentHashMap<>();

    public void registerStatsItemSet(String statsKey, ScheduledExecutorService scheduledExecutorService, Logger log) {
        statsTable.put(statsKey, new StatsItemSet(statsKey, scheduledExecutorService, log));
    }

    // Other methods for managing statistics might be added here.

}