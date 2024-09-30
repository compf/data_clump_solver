package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.stats.Stats;
import org.apache.rocketmq.logging.LoggerName;
import org.apache.rocketmq.common.ThreadFactoryImpl;
import org.apache.rocketmq.common.utils.ThreadUtils;
import org.apache.rocketmq.common.BrokerConfig;
import org.apache.rocketmq.common.statistics.StatisticsManager;
import org.apache.rocketmq.common.statistics.StatisticsItemFormatter;
import org.apache.rocketmq.common.statistics.StatisticsItemStateGetter;
import org.apache.rocketmq.common.statistics.StatisticsItem;
import org.apache.rocketmq.common.stats.MomentStatsItemSet;
import org.apache.rocketmq.common.stats.StatsItemSet;
import org.apache.commons.lang3.tuple.Pair;
import java.util.HashMap;
import java.util.concurrent.ScheduledExecutorService;
import org.apache.rocketmq.logging.org.slf4j.Logger;
import org.apache.rocketmq.logging.org.slf4j.LoggerFactory;

public class BrokerStatsManager {
    // The content of this class has been removed as part of the refactoring process.
}
