public class StatsKey {

    private String topic;
    private Integer queueId;
    private String group;
    private String owner;
    private String instanceId;
    private String msgType;
    private String flowlimitThreshold;

    // Constructors, getters, and setters would be here

    public static StatsKey parse(String key) {
        // The implementation of parsing the key string
        // and creating a new StatsKey instance
    }

    // Other utility methods if necessary
}