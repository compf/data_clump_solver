/* Content of the newly created FallBehindStatKeyBuilder.java with the refactored method */
package org.apache.rocketmq.store.stats;

public class FallBehindStatKeyBuilder {
    public static String buildKey(int queueId, String topic, String group) {
        // Implement the logic previously in 'buildStatsKey'
        return String.format("%s-%s-%d", group, topic, queueId);
    }
}