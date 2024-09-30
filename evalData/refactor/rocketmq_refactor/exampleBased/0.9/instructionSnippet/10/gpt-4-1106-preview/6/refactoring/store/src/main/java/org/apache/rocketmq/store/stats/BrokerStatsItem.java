/*
 * BrokerStatsItem - Enum to manage broker statistic items in a central place
 */
public enum BrokerStatsItem {
    // Enum definitions for each statistical item

    QUEUE_PUT_NUMS("QUEUE_PUT_NUMS"),
    QUEUE_PUT_SIZE("QUEUE_PUT_SIZE"),
    QUEUE_GET_NUMS("QUEUE_GET_NUMS"),
    // ... rest of the enum items

    private final String key;

    BrokerStatsItem(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    // Methods related to statistical operations can be added here
}
