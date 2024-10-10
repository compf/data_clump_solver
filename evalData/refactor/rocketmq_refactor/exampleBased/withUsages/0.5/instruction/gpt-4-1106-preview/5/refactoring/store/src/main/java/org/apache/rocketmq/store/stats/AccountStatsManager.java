package org.apache.rocketmq.store.stats;

import org.apache.rocketmq.common.Utils;
import org.apache.rocketmq.common.stats.StatisticsItem;
import org.apache.rocketmq.common.statistics.StatisticsKindMeta;
import org.apache.rocketmq.common.statistics.StatisticsManager;
import org.apache.rocketmq.store.stats.BrokerStatsManager.StateGetter;

import java.util.Map;

public class AccountStatsManager {

    private final StatisticsManager statisticsManager;
    private StateGetter producerStateGetter;
    private StateGetter consumerStateGetter;

    public AccountStatsManager() {
        this.statisticsManager = new StatisticsManager();
    }

    public void addStats(String key, String[] itemNames, String[] kinds, Map<String, Long> values) {
        for (String kind : kinds) {
            this.statisticsManager.inc(kind, key, values.get(kind));
        }
    }

    public void setProducerStateGetter(StateGetter producerStateGetter) {
        this.producerStateGetter = producerStateGetter;
    }

    public void setConsumerStateGetter(StateGetter consumerStateGetter) {
        this.consumerStateGetter = consumerStateGetter;
    }

    public void addKindMeta(StatisticsKindMeta kindMeta) {
        this.statisticsManager.addStatisticsKindMeta(kindMeta);
    }

    public void setOnlineChecker() {
        this.statisticsManager.setStatisticsItemStateGetter(item -> {
            String[] strArr = Utils.split(item.getStatObject(), '|');
            if (strArr.length < 4) {
                return false;
            }
            String instanceId = strArr[1];
            String topic = strArr[2];
            String group = strArr[3];
            if (BrokerStatsManager.ACCOUNT_SEND.equals(item.getStatKind()) || BrokerStatsManager.ACCOUNT_SEND_REJ.equals(item.getStatKind())) {
                return producerStateGetter.online(instanceId, group, topic);
            } else if (BrokerStatsManager.ACCOUNT_RCV.equals(item.getStatKind()) || BrokerStatsManager.ACCOUNT_SEND_BACK.equals(item.getStatKind()) || BrokerStatsManager.ACCOUNT_SEND_BACK_TO_DLQ.equals(item.getStatKind()) || BrokerStatsManager.ACCOUNT_REV_REJ.equals(item.getStatKind())) {
                return consumerStateGetter.online(instanceId, group, topic);
            }
            return false;
        });
    }

    public void buildRunningStats(Map<String, String> stats) {
        this.statisticsManager.buildRunningStats(stats);
    }

    public static long compute24HourSum(StatisticsItem item) {
        return BrokerStatsManager.compute24HourSum(item);
    }
}
