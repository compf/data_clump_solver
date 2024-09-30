/* Content of the newly created QueueStatsCalculator.java with the refactored methods */
package org.apache.rocketmq.broker.metrics;

import org.apache.rocketmq.common.Pair;

public class QueueStatsCalculator {
    public static Pair<Long, Long> getConsumerLagStats(MessageStore messageStore, String topic, int queueId) {
        long brokerOffset = messageStore.getMaxOffsetInQueue(topic, queueId);
        // Implement the rest of the logic from 'getConsumerLagStats'
        return Pair.of(brokerOffset, /* other value needed for the Pair */);
    }

    public static long calculateMessageCount(long from, long to) {
        return to - from;
    }
}