package org.apache.rocketmq.store.stats;

public interface StateAccessor {
    boolean isOnline(String instanceId, String group, String topic);
}