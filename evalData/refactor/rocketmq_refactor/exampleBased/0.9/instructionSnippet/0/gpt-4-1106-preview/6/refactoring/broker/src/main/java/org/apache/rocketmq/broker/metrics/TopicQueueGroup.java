public class TopicQueueGroup {
    private String topic;
    private int queueId;
    private String group;

    public TopicQueueGroup(String topic, int queueId, String group) {
        this.topic = topic;
        this.queueId = queueId;
        this.group = group;
    }

    public String getTopic() {
        return topic;
    }

    public int getQueueId() {
        return queueId;
    }

    public String getGroup() {
        return group;
    }
}