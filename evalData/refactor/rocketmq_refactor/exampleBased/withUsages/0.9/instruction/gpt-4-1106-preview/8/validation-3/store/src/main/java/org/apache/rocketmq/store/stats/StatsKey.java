package org.apache.rocketmq.store.stats;

public class StatsKey {
    private final String topic;
    private final int queueId;
    private final String group;

    public StatsKey(String topic, int queueId, String group) {
        this.topic = topic;
        this.queueId = queueId;
        this.group = group;
    }

    public String getStatsKey() {
        StringBuilder strBuilder = new StringBuilder();
        if (topic != null) {
            strBuilder.append(topic).append('@');
        }
        if (queueId > -1) {
            strBuilder.append(queueId);
        }
        if (group != null) {
            if (strBuilder.length() > 0)
                strBuilder.append('@');
            strBuilder.append(group);
        }
        return strBuilder.toString();
    }
}