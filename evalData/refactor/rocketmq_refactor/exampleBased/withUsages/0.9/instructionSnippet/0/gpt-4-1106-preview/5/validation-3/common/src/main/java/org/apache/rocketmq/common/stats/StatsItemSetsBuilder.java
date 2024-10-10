package org.apache.rocketmq.common.stats;
package org.apache.rocketmq.common.stats;
package org.apache.rocketmq.common.stats;
package org.apache.rocketmq.common.stats;
import java.util.Map;
import java.util.concurrent.ScheduledExecutorService;
import org.slf4j.Logger;

public class StatsItemSetsBuilder {
    // Method implementations...
}
import java.util.Map;
import java.util.concurrent.ScheduledExecutorService;
import org.slf4j.Logger;

public class StatsItemSetsBuilder {

    public static Map<String, StatsItemSet> buildForQueue(Map<String, StatsItemSet> statsTable, ScheduledExecutorService scheduledExecutorService, Logger log) {
        // Logic to build Queue stats
        return statsTable;
    }

    public static Map<String, StatsItemSet> buildForTopicsAndGroups(Map<String, StatsItemSet> statsTable, ScheduledExecutorService scheduledExecutorService, Logger log) {
        // Logic to build Topics and Groups stats
        return statsTable;
    }

    public static Map<String, StatsItemSet> buildForBroker(Map<String, StatsItemSet> statsTable, ScheduledExecutorService scheduledExecutorService, Logger log) {
        // Logic to build Broker stats
        return statsTable;
    }

    public static Map<String, StatsItemSet> buildForDiskAccess(Map<String, StatsItemSet> statsTable, ScheduledExecutorService scheduledExecutorService, Logger log) {
        // Logic to build Disk Access stats
        return statsTable;
    }

    public static Map<String, StatsItemSet> buildForCommercial(Map<String, StatsItemSet> statsTable, ScheduledExecutorService commercialExecutor, Logger log) {
        // Logic to build Commercial stats
        return statsTable;
    }

    public static Map<String, StatsItemSet> onTopicDeleted(Map<String, StatsItemSet> statsTable, String topic, boolean enableQueueStat) {
        // Logic when a topic is deleted
        return statsTable;
    }

    public static Map<String, StatsItemSet> onGroupDeleted(Map<String, StatsItemSet> statsTable, String group, boolean enableQueueStat) {
        // Logic when a group is deleted
        return statsTable;
    }
}
