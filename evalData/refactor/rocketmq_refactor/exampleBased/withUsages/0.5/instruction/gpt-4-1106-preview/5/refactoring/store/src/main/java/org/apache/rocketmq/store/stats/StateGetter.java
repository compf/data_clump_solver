package org.apache.rocketmq.store.stats;

public interface StateGetter {
    boolean online(String instanceId, String group, String topic);
}
