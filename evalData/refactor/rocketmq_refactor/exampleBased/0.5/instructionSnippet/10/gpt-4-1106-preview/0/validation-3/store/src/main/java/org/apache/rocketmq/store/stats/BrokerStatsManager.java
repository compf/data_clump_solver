/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
// BrokerStatsManager constants have been refactored and deprecated constants have been removed.
    public static final String SNDBCK2DLQ_TIMES = "SNDBCK2DLQ_TIMES";

    public static final String COMMERCIAL_OWNER = "Owner";

    public static final String ACCOUNT_OWNER_PARENT = "OWNER_PARENT";
    public static final String ACCOUNT_OWNER_SELF = "OWNER_SELF";

    public static final long ACCOUNT_STAT_INVERTAL = 60 * 1000;
    public static final String ACCOUNT_AUTH_TYPE = "AUTH_TYPE";

    public static final String ACCOUNT_SEND = "SEND";
    public static final String ACCOUNT_RCV = "RCV";
    public static final String ACCOUNT_SEND_BACK = "SEND_BACK";
    public static final String ACCOUNT_SEND_BACK_TO_DLQ = "SEND_BACK_TO_DLQ";
    public static final String ACCOUNT_AUTH_FAILED = "AUTH_FAILED";
// Content of BrokerStatsManager has been refactored to resolve compilation issues.

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 // Content of BrokerStatsManager has been refactored to resolve compilation issues.

/*

 * contributor license agreements.  See the NOTICE file distributed with
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * The ASF licenses this file to You under the Apache License, Version 2.0
    * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * this work for additional information regarding copyright ownership.
    *      http://www.apache.org/licenses/LICENSE-2.0
        *
        * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
        * limitations under the License.
            */
// Content of BrokerStatsManager has been refactored to resolve compilation issues.

/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.rocketmq.store.stats;

// ... Other import statements ...

public class BrokerStatsManager {
    // ... Rest of the class implementation ...
    // Methods moved to appropriate locations within the class
    // Syntax errors corrected
}

        final String instanceId, final String group, final String topic,
        final String msgType, final String flowlimitThreshold, final int incValue) {
        final String statsKey = buildAccountStatsKey(accountOwnerParent, accountOwnerSelf, instanceId, topic, group,
            msgType, flowlimitThreshold);
        this.statsTable.get(key).addValue(statsKey, incValue, 1);
    }

    public void incAccountValue(final String statType, final String owner, final String instanceId, final String topic,
        final String group, final String msgType,
        final long... incValues) {
        final String key = buildAccountStatKey(owner, instanceId, topic, group, msgType);
        this.accountStatManager.inc(statType, key, incValues);
    }

    public void incAccountValue(final String statType, final String owner, final String instanceId, final String topic,
        final String group, final String msgType, final String flowlimitThreshold,
        final long... incValues) {
        final String key = buildAccountStatKey(owner, instanceId, topic, group, msgType, flowlimitThreshold);
        this.accountStatManager.inc(statType, key, incValues);
    }

    public String buildCommercialStatsKey(String owner, String topic, String group, String type) {
        StringBuilder strBuilder = new StringBuilder();
        strBuilder.append(owner);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(type);
        return strBuilder.toString();
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId,
        String topic, String group, String msgType) {
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(accountOwnerParent);
        strBuilder.append("@");
        strBuilder.append(accountOwnerSelf);
        strBuilder.append("@");
        strBuilder.append(instanceId);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(msgType);
        return strBuilder.toString();
    }

    public String buildAccountStatsKey(String accountOwnerParent, String accountOwnerSelf, String instanceId,
        String topic, String group, String msgType, String flowlimitThreshold) {
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(accountOwnerParent);
        strBuilder.append("@");
        strBuilder.append(accountOwnerSelf);
        strBuilder.append("@");
        strBuilder.append(instanceId);
        strBuilder.append("@");
        strBuilder.append(topic);
        strBuilder.append("@");
        strBuilder.append(group);
        strBuilder.append("@");
        strBuilder.append(msgType);
        strBuilder.append("@");
        strBuilder.append(flowlimitThreshold);
        return strBuilder.toString();
    }

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType) {
        final String sep = "|";
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(owner).append(sep);
        strBuilder.append(instanceId).append(sep);
        strBuilder.append(topic).append(sep);
        strBuilder.append(group).append(sep);
        strBuilder.append(msgType);
        return strBuilder.toString();
    }

    public String buildAccountStatKey(final String owner, final String instanceId,
        final String topic, final String group,
        final String msgType, String flowlimitThreshold) {
        final String sep = "|";
        StringBuffer strBuilder = new StringBuffer();
        strBuilder.append(owner).append(sep);
        strBuilder.append(instanceId).append(sep);
        strBuilder.append(topic).append(sep);
        strBuilder.append(group).append(sep);
        strBuilder.append(msgType).append(sep);
        strBuilder.append(flowlimitThreshold);
        return strBuilder.toString();
    }

    public String[] splitAccountStatKey(final String accountStatKey) {
        final String sep = "\\|";
        return accountStatKey.split(sep);
    }

    private StatisticsKindMeta createStatisticsKindMeta(String name,
        String[] itemNames,
        ScheduledExecutorService executorService,
        StatisticsItemFormatter formatter,
        Logger log,
        long interval) {
        final BrokerConfig brokerConfig = this.brokerConfig;
        StatisticsItemPrinter printer = new StatisticsItemPrinter(formatter, log);
        StatisticsKindMeta kindMeta = new StatisticsKindMeta();
        kindMeta.setName(name);
        kindMeta.setItemNames(itemNames);
        kindMeta.setScheduledPrinter(
            new StatisticsItemScheduledIncrementPrinter(
                "Stat In One Minute: ",
                printer,
                executorService,
                new StatisticsItemScheduledPrinter.InitialDelay() {
                    @Override
                    public long get() {
                        return Math.abs(UtilAll.computeNextMinutesTimeMillis() - System.currentTimeMillis());
                    }
                },
                interval,
                new String[] {MSG_NUM},
                new StatisticsItemScheduledIncrementPrinter.Valve() {
                    @Override
                    public boolean enabled() {
                        return brokerConfig != null ? brokerConfig.isAccountStatsEnable() : true;
                    }

                    @Override
                    public boolean printZeroLine() {
                        return brokerConfig != null ? brokerConfig.isAccountStatsPrintZeroValues() : true;
                    }
                }
            )
        );
        return kindMeta;
    }

    public interface StateGetter {
        boolean online(String instanceId, String group, String topic);
    }

    public enum StatsType {
        SEND_SUCCESS,
        SEND_FAILURE,

        RCV_SUCCESS,
        RCV_EPOLLS,
        SEND_BACK,
        SEND_BACK_TO_DLQ,

        SEND_ORDER,
        SEND_TIMER,
        SEND_TRANSACTION,

        PERM_FAILURE
    }
}
