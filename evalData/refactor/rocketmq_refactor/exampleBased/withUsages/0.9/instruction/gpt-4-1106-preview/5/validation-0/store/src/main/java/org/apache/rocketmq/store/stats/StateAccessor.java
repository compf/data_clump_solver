package org.apache.rocketmq.store.stats;

/**
 * Interface to access the state of a certain instance within a group and topic.
 */
public interface StateAccessor {
    /**
     * Check if a given instance within a group and topic is online.
     *
     * @param instanceId the instance identifier
     * @param group      the group name
     * @param topic      the topic name
     * @return boolean indicating whether the instance is online
     */
    boolean isOnline(String instanceId, String group, String topic);
}