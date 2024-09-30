package org.apache.rocketmq.common.stats;

public class StatItemKey {
    private final String key;
    private final String owner;
    private final String accountOwnerParent;
    private final String accountOwnerSelf;
    private final String instanceId;
    private final String group;
    private final String topic;
    private final String msgType;
    private final int queueId;

    public StatItemKey(String key, String owner, String accountOwnerParent, String accountOwnerSelf, String instanceId, String group, String topic, String msgType, int queueId) {
        this.key = key;
        this.owner = owner;
        this.accountOwnerParent = accountOwnerParent;
        this.accountOwnerSelf = accountOwnerSelf;
        this.instanceId = instanceId;
        this.group = group;
        this.topic = topic;
        this.msgType = msgType;
        this.queueId = queueId;
    }

    public String getKey() {
        return key;
    }

    public String getOwner() {
        return owner;
    }

    public String getAccountOwnerParent() {
        return accountOwnerParent;
    }

    public String getAccountOwnerSelf() {
        return accountOwnerSelf;
    }

    public String getInstanceId() {
        return instanceId;
    }

    public String getGroup() {
        return group;
    }

    public String getTopic() {
        return topic;
    }

    public String getMsgType() {
        return msgType;
    }

    public int getQueueId() {
        return queueId;
    }
}
