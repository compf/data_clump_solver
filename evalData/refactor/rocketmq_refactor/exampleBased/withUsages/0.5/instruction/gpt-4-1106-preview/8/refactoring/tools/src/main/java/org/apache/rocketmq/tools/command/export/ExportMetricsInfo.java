package org.apache.rocketmq.tools.command.export;

import java.util.HashMap;
import java.util.Map;

public class ExportMetricsInfo {

    private Map<String, Double> totalTpsMap = new HashMap<>();
    private Map<String, Long> totalOneDayNumMap = new HashMap<>();

    public void initTotalMap() {
        totalTpsMap.put("totalNormalInTps", 0.0);
        totalTpsMap.put("totalNormalOutTps", 0.0);
        totalTpsMap.put("totalTransInTps", 0.0);
        totalTpsMap.put("totalScheduleInTps", 0.0);

        totalOneDayNumMap.put("normalOneDayInNum", 0L);
        totalOneDayNumMap.put("normalOneDayOutNum", 0L);
        totalOneDayNumMap.put("transOneDayInNum", 0L);
        totalOneDayNumMap.put("scheduleOneDayInNum", 0L);
    }

    public Map<String, Double> getTotalTpsMap() {
        return totalTpsMap;
    }

    public Map<String, Long> getTotalOneDayNumMap() {
        return totalOneDayNumMap;
    }

    public Map<String, Object> getTotalData() {
        Map<String, Object> totalData = new HashMap<>();
        totalData.put("totalTps", totalTpsMap);
        totalData.put("totalOneDayNum", totalOneDayNumMap);
        return totalData;
    }
}