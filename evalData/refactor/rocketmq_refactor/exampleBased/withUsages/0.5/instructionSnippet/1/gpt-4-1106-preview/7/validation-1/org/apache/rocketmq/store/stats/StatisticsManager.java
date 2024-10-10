package org.apache.rocketmq.store.stats;

import java.util.concurrent.ScheduledExecutorService;
import org.apache.rocketmq.logging.org.slf4j.Logger;

public class StatisticsManager {

    private ScheduledExecutorService scheduledExecutorService;
    private Logger log;

    public StatisticsManager(ScheduledExecutorService scheduledExecutorService, Logger log) {
        this.scheduledExecutorService = scheduledExecutorService;
        this.log = log;
    }

    // Methods to manage stats items...
}
