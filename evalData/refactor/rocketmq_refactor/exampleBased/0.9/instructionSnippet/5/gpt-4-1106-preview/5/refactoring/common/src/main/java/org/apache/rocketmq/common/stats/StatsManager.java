package org.apache.rocketmq.common.stats;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class StatsManager {

    private Map<StatsName, String> statsNames = new ConcurrentHashMap<>();

    public enum StatsName {
        QUEUE_PUT_NUMS,
        QUEUE_PUT_SIZE,
        QUEUE_GET_NUMS,
        QUEUE_GET_SIZE,
        TOPIC_PUT_NUMS,
        TOPIC_PUT_SIZE,
        GROUP_GET_NUMS,
        GROUP_GET_SIZE,
        SNDBCK_PUT_NUMS,
        BROKER_PUT_NUMS,
        BROKER_GET_NUMS,
        GROUP_GET_FROM_DISK_NUMS,
        GROUP_GET_FROM_DISK_SIZE,
        BROKER_GET_FROM_DISK_NUMS,
        BROKER_GET_FROM_DISK_SIZE,
        COMMERCIAL_SEND_TIMES,
        COMMERCIAL_SNDBCK_TIMES,
        COMMERCIAL_RCV_TIMES,
        COMMERCIAL_RCV_EPOLLS,
        COMMERCIAL_SEND_SIZE,
        COMMERCIAL_RCV_SIZE,
        COMMERCIAL_PERM_FAILURES,
        GROUP_GET_FALL_SIZE,
        GROUP_GET_FALL_TIME,
        GROUP_GET_LATENCY
    }

    public StatsManager() {
        initializeStatsNames();
    }

    private void initializeStatsNames() {
        statsNames.put(StatsName.QUEUE_PUT_NUMS, "QUEUE_PUT_NUMS");
        statsNames.put(StatsName.QUEUE_PUT_SIZE, "QUEUE_PUT_SIZE");
        // ... (initialize all other stats names similarly) ...
    }

    public String getStatsName(StatsName statsName) {
        return statsNames.getOrDefault(statsName, "");
    }
}
