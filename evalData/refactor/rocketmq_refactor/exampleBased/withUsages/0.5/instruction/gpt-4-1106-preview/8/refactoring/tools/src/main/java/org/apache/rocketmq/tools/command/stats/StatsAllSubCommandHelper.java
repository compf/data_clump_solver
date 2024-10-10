package org.apache.rocketmq.tools.command.stats;

import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.common.MixAll;
import org.apache.rocketmq.common.UtilAll;
import org.apache.rocketmq.remoting.RPCHook;
import org.apache.rocketmq.remoting.exception.RemotingException;
import org.apache.rocketmq.remoting.protocol.admin.ConsumeStats;
import org.apache.rocketmq.remoting.protocol.body.BrokerStatsData;
import org.apache.rocketmq.remoting.protocol.body.GroupList;
import org.apache.rocketmq.remoting.protocol.route.BrokerData;
import org.apache.rocketmq.remoting.protocol.route.TopicRouteData;
import org.apache.rocketmq.tools.admin.DefaultMQAdminExt;
import org.apache.rocketmq.tools.command.SubCommandException;

public class StatsAllSubCommandHelper {

    public static long compute24HourSum(BrokerStatsData bsd) {
        if (bsd.getStatsDay().getSum() != 0) {
            return bsd.getStatsDay().getSum();
        }

        if (bsd.getStatsHour().getSum() != 0) {
            return bsd.getStatsHour().getSum();
        }

        if (bsd.getStatsMinute().getSum() != 0) {
            return bsd.getStatsMinute().getSum();
        }

        return 0;
    }

    public static void printTopicDetail(final DefaultMQAdminExt admin, final String topic, final boolean activeTopic)
        throws RemotingException, MQClientException, InterruptedException, MQBrokerException {
        TopicRouteData topicRouteData = admin.examineTopicRouteInfo(topic);

        GroupList groupList = admin.queryTopicConsumeByWho(topic);

        double inTPS = 0;

        long inMsgCntToday = 0;

        for (BrokerData bd : topicRouteData.getBrokerDatas()) {
            String masterAddr = bd.getBrokerAddrs().get(MixAll.MASTER_ID);
            if (masterAddr != null) {
                try {
                    BrokerStatsData bsd = admin.viewBrokerStatsData(masterAddr, Stats.TOPIC_PUT_NUMS, topic);
                    inTPS += bsd.getStatsMinute().getTps();
                    inMsgCntToday += compute24HourSum(bsd);
                } catch (Exception e) {
                }
            }
        }

        if (groupList != null && !groupList.getGroupList().isEmpty()) {

            for (String group : groupList.getGroupList()) {
                double outTPS = 0;
                long outMsgCntToday = 0;

                for (BrokerData bd : topicRouteData.getBrokerDatas()) {
                    String masterAddr = bd.getBrokerAddrs().get(MixAll.MASTER_ID);
                    if (masterAddr != null) {
                        try {
                            String statsKey = String.format("%s@%s", topic, group);
                            BrokerStatsData bsd = admin.viewBrokerStatsData(masterAddr, Stats.GROUP_GET_NUMS, statsKey);
                            outTPS += bsd.getStatsMinute().getTps();
                            outMsgCntToday += compute24HourSum(bsd);
                        } catch (Exception e) {
                        }
                    }
                }

                long accumulate = 0;
                try {
                    ConsumeStats consumeStats = admin.examineConsumeStats(group, topic);
                    if (consumeStats != null) {
                        accumulate = consumeStats.computeTotalDiff();
                        if (accumulate < 0) {
                            accumulate = 0;
                        }
                    }
                } catch (Exception e) {
                }

                if (!activeTopic || inMsgCntToday > 0 ||
                    outMsgCntToday > 0) {

                    System.out.printf("%-64s  %-64s %12d %11.2f %11.2f %14d %14d%n",
                        UtilAll.frontStringAtLeast(topic, 64),
                        UtilAll.frontStringAtLeast(group, 64),
                        accumulate,
                        inTPS,
                        outTPS,
                        inMsgCntToday,
                        outMsgCntToday
                    );
                }
            }
        } else {
            if (!activeTopic || inMsgCntToday > 0) {

                System.out.printf("%-64s  %-64s %12d %11.2f %11s %14d %14s%n",
                    UtilAll.frontStringAtLeast(topic, 64),
                    "",
                    0,
                    inTPS,
                    "",
                    inMsgCntToday,
                    "NO_CONSUMER"
                );
            }
        }
    }
}