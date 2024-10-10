package org.apache.rocketmq.common.stats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatsItemSet {
    private String statsName;
    private final Map<String, StatsItem> statsItemTable;
    private final List<CallSnapshot> callSnapshotList;

    public StatsItemSet(String statsName) {
        this.statsName = statsName;
        this.statsItemTable = new HashMap<String, StatsItem>();
        this.callSnapshotList = new ArrayList<CallSnapshot>();
    }

    // Additional methods and logic
}