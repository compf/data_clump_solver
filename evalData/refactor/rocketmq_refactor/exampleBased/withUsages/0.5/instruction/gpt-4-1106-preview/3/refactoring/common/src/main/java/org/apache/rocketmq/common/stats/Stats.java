package org.apache.rocketmq.common.stats;

public class Stats {

    public static final String QUEUE_PUT_NUMS = "QUEUE_PUT_NUMS";
    public static final String QUEUE_PUT_SIZE = "QUEUE_PUT_SIZE";
    public static final String QUEUE_GET_NUMS = "QUEUE_GET_NUMS";
    public static final String QUEUE_GET_SIZE = "QUEUE_GET_SIZE";
    public static final String TOPIC_PUT_NUMS = "TOPIC_PUT_NUMS";
    public static final String TOPIC_PUT_SIZE = "TOPIC_PUT_SIZE";
    public static final String GROUP_GET_NUMS = "GROUP_GET_NUMS";
    public static final String GROUP_GET_SIZE = "GROUP_GET_SIZE";
    public static final String SNDBCK_PUT_NUMS = "SNDBCK_PUT_NUMS";
    public static final String BROKER_PUT_NUMS = "BROKER_PUT_NUMS";
    public static final String BROKER_GET_NUMS = "BROKER_GET_NUMS";
    public static final String GROUP_GET_FROM_DISK_NUMS = "GROUP_GET_FROM_DISK_NUMS";
    public static final String GROUP_GET_FROM_DISK_SIZE = "GROUP_GET_FROM_DISK_SIZE";
    public static final String BROKER_GET_FROM_DISK_NUMS = "BROKER_GET_FROM_DISK_NUMS";
    public static final String BROKER_GET_FROM_DISK_SIZE = "BROKER_GET_FROM_DISK_SIZE";
    public static final String COMMERCIAL_SEND_TIMES = "COMMERCIAL_SEND_TIMES";
    public static final String COMMERCIAL_SNDBCK_TIMES = "COMMERCIAL_SNDBCK_TIMES";
    public static final String COMMERCIAL_RCV_TIMES = "COMMERCIAL_RCV_TIMES";
    public static final String COMMERCIAL_RCV_EPOLLS = "COMMERCIAL_RCV_EPOLLS";
    public static final String COMMERCIAL_SEND_SIZE = "COMMERCIAL_SEND_SIZE";
    public static final String COMMERCIAL_RCV_SIZE = "COMMERCIAL_RCV_SIZE";
    public static final String COMMERCIAL_PERM_FAILURES = "COMMERCIAL_PERM_FAILURES";

    public static final String GROUP_GET_FALL_SIZE = "GROUP_GET_FALL_SIZE";
    public static final String GROUP_GET_FALL_TIME = "GROUP_GET_FALL_TIME";
    public static final String GROUP_GET_LATENCY = "GROUP_GET_LATENCY";

    public static final String TOPIC_PUT_LATENCY = "TOPIC_PUT_LATENCY";
    public static final String GROUP_ACK_NUMS = "GROUP_ACK_NUMS";
    public static final String GROUP_CK_NUMS = "GROUP_CK_NUMS";
    public static final String DLQ_PUT_NUMS = "DLQ_PUT_NUMS";
    public static final String BROKER_ACK_NUMS = "BROKER_ACK_NUMS";
    public static final String BROKER_CK_NUMS = "BROKER_CK_NUMS";
    public static final String BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC = "BROKER_GET_NUMS_WITHOUT_SYSTEM_TOPIC";
    public static final String BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC = "BROKER_PUT_NUMS_WITHOUT_SYSTEM_TOPIC";
    public static final String SNDBCK2DLQ_TIMES = "SNDBCK2DLQ_TIMES";

    public static final String ACCOUNT_OWNER_PARENT = "OWNER_PARENT";
    public static final String ACCOUNT_OWNER_SELF = "OWNER_SELF";

    public static final long ACCOUNT_STAT_INVERTAL = 60 * 1000;
    public static final String ACCOUNT_AUTH_TYPE = "AUTH_TYPE";

    public static final String ACCOUNT_SEND = "SEND";
    public static final String ACCOUNT_RCV = "RCV";
    public static final String ACCOUNT_SEND_BACK = "SEND_BACK";
    public static final String ACCOUNT_SEND_BACK_TO_DLQ = "SEND_BACK_TO_DLQ";
    public static final String ACCOUNT_AUTH_FAILED = "AUTH_FAILED";
    public static final String ACCOUNT_SEND_REJ = "SEND_REJ";
    public static final String ACCOUNT_REV_REJ = "RCV_REJ";

    public static final String MSG_NUM = "MSG_NUM";
    public static final String MSG_SIZE = "MSG_SIZE";
    public static final String SUCCESS_MSG_NUM = "SUCCESS_MSG_NUM";
    public static final String FAILURE_MSG_NUM = "FAILURE_MSG_NUM";
    public static final String COMMERCIAL_MSG_NUM = "COMMERCIAL_MSG_NUM";
    public static final String SUCCESS_REQ_NUM = "SUCCESS_REQ_NUM";
    public static final String FAILURE_REQ_NUM = "FAILURE_REQ_NUM";
    public static final String SUCCESS_MSG_SIZE = "SUCCESS_MSG_SIZE";
    public static final String FAILURE_MSG_SIZE = "FAILURE_MSG_SIZE";
    public static final String RT = "RT";
    public static final String INNER_RT = "INNER_RT";

    public static final String CONSUMER_REGISTER_TIME = "CONSUMER_REGISTER_TIME";
    public static final String PRODUCER_REGISTER_TIME = "PRODUCER_REGISTER_TIME";
    public static final String CHANNEL_ACTIVITY = "CHANNEL_ACTIVITY";
    public static final String CHANNEL_ACTIVITY_CONNECT = "CONNECT";
    public static final String CHANNEL_ACTIVITY_IDLE = "IDLE";
    public static final String CHANNEL_ACTIVITY_EXCEPTION = "EXCEPTION";
    public static final String CHANNEL_ACTIVITY_CLOSE = "CLOSE";

}