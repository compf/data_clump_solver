package org.apache.rocketmq.common.stats;

import java.util.concurrent.ScheduledExecutorService;
import org.slf4j.Logger;

public class StatsManager {

    private final ScheduledExecutorService scheduledExecutorService;
    private final Logger log;

    public StatsManager(ScheduledExecutorService scheduledExecutorService, Logger log) {
        this.scheduledExecutorService = scheduledExecutorService;
        this.log = log;
    }

    // ... Rest of the class
}