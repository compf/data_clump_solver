package org.apache.rocketmq.store.stats;

public class AccountStatsKey {
    private final String accountOwnerParent;
    private final String accountOwnerSelf;
    private final String instanceId;
    private final String topic;
    private final String group;
    private final String msgType;
    private final String flowlimitThreshold;

    public AccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId, String topic, String group, String msgType, String flowlimitThreshold) {
        this.accountOwnerParent = accountOwnerParent;
        this.accountOwnerSelf = accountOwnerSelf;
        this.instanceId = instanceId;
        this.topic = topic;
        this.group = group;
        this.msgType = msgType;
        this.flowlimitThreshold = flowlimitThreshold;
    }

    public AccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId, String topic, String group, String msgType) {
        this(accountOwnerParent, accountOwnerSelf, instanceId, topic, group, msgType, null);
    }

    @Override
    public String toString() {
        return String.format("%s@%s@%s@%s@%s@%s%s", accountOwnerParent, accountOwnerSelf, instanceId, topic, group, msgType, (flowlimitThreshold != null ? "@" + flowlimitThreshold : ""));
    }
}