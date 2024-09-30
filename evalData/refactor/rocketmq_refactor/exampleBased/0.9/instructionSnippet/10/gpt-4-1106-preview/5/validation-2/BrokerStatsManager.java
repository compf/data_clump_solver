package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.logging.InternalLogger;
import org.apache.rocketmq.logging.InternalLoggerFactory;
import java.util.concurrent.*;
import java.util.*;
import org.apache.rocketmq.store.config.BrokerRole;
import org.apache.rocketmq.store.config.MessageStoreConfig;
import org.apache.rocketmq.common.ThreadFactoryImpl;
import org.apache.rocketmq.common.stats.*;

public class BrokerStatsManager {
    // Omitted: existing class content

    public enum StatsType {
        SEND_BACK,
        SEND_BACK_TO_DLQ,

        SEND_ORDER,
        SEND_TIMER,
        SEND_TRANSACTION,

        PERM_FAILURE;

        // Additional methods and fields if necessary
    }

    // Additional methods and nested classes if necessary
}
