package org.apache.rocketmq.store.stats;

import java.util.concurrent.ScheduledExecutorService;
import org.apache.rocketmq.logging.InternalLogger;
import org.apache.rocketmq.common.stats.StatsItemSet;

public class StatsManager {
    private final ScheduledExecutorService scheduledExecutorService;
    private final InternalLogger log;

    public StatsManager(ScheduledExecutorService scheduledExecutorService, InternalLogger log) {
        this.scheduledExecutorService = scheduledExecutorService;
        this.log = log;
    }

    // Methods to interact with stats, like registerStatsItemSets, incrementStatsItem, deleteStatsByTopic, deleteStatsByGroup, getStatsItem, etc.
}