package org.apache.rocketmq.store.stats;

public enum StatsItemKey {
    QUEUE_PUT_NUMS("QUEUE_PUT_NUMS"),
    QUEUE_PUT_SIZE("QUEUE_PUT_SIZE"),
    QUEUE_GET_NUMS("QUEUE_GET_NUMS"),
    QUEUE_GET_SIZE("QUEUE_GET_SIZE"),
    TOPIC_PUT_NUMS("TOPIC_PUT_NUMS"),
    TOPIC_PUT_SIZE("TOPIC_PUT_SIZE"),
    GROUP_GET_NUMS("GROUP_GET_NUMS"),
    GROUP_GET_SIZE("GROUP_GET_SIZE"),
    SNDBCK_PUT_NUMS("SNDBCK_PUT_NUMS"),
    BROKER_PUT_NUMS("BROKER_PUT_NUMS"),
    BROKER_GET_NUMS("BROKER_GET_NUMS"),
    GROUP_GET_FROM_DISK_NUMS("GROUP_GET_FROM_DISK_NUMS"),
    GROUP_GET_FROM_DISK_SIZE("GROUP_GET_FROM_DISK_SIZE"),
    BROKER_GET_FROM_DISK_NUMS("BROKER_GET_FROM_DISK_NUMS"),
    BROKER_GET_FROM_DISK_SIZE("BROKER_GET_FROM_DISK_SIZE"),
    COMMERCIAL_SEND_TIMES("COMMERCIAL_SEND_TIMES"),
    COMMERCIAL_SNDBCK_TIMES("COMMERCIAL_SNDBCK_TIMES"),
    COMMERCIAL_RCV_TIMES("COMMERCIAL_RCV_TIMES"),
    COMMERCIAL_RCV_EPOLLS("COMMERCIAL_RCV_EPOLLS"),
    COMMERCIAL_SEND_SIZE("COMMERCIAL_SEND_SIZE"),
    COMMERCIAL_RCV_SIZE("COMMERCIAL_RCV_SIZE"),
    COMMERCIAL_PERM_FAILURES("COMMERCIAL_PERM_FAILURES"),

    GROUP_GET_FALL_SIZE("GROUP_GET_FALL_SIZE"),
    GROUP_GET_FALL_TIME("GROUP_GET_FALL_TIME"),
    GROUP_GET_LATENCY("GROUP_GET_LATENCY");

    private final String key;

    StatsItemKey(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public static StatsItemKey fromString(String text) {
        if (text != null) {
          for (StatsItemKey b : StatsItemKey.values()) {
            if (text.equalsIgnoreCase(b.key)) {
              return b;
            }
          }
        }
        return null;
      }
}