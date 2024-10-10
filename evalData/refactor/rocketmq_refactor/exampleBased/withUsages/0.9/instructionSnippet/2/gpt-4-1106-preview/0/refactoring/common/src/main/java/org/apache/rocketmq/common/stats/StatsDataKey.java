public final class StatsDataKey {

    // New constants to replace those in the Stats class
    public static final String QUEUE_PUT_NUMS = "QUEUE_PUT_NUMS";
    public static final String QUEUE_PUT_SIZE = "QUEUE_PUT_SIZE";
    public static final String QUEUE_GET_NUMS = "QUEUE_GET_NUMS";
    public static final String QUEUE_GET_SIZE = "QUEUE_GET_SIZE";
    // ... all other extracted constants ...

    private StatsDataKey() {
        // Utility class, no instances allowed
    }

    // Possible place for additional methods related to stats keys
}