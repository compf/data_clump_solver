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

@RunWith(MockitoJUnitRunner.class)
public class EndTransactionProcessorTest {

    private static final String TOPIC = "trans_topic_test";

    private EndTransactionProcessor endTransactionProcessor;

    @Mock
    private ChannelHandlerContext handlerContext;

    @Spy
    private BrokerController
        brokerController = new BrokerController(new BrokerConfig(), new NettyServerConfig(), new NettyClientConfig(),
            new MessageStoreConfig(), null);

    @Mock
    private MessageStore messageStore;

    @Mock
    private TransactionalMessageService transactionMsgService;

    @Mock
    private TransactionMetrics transactionMetrics;

    @Before
    public void init() {
        when(transactionMsgService.getTransactionMetrics()).thenReturn(transactionMetrics);
        brokerController.setMessageStore(messageStore);
        brokerController.setTransactionalMessageService(transactionMsgService);
        endTransactionProcessor = new EndTransactionProcessor(brokerController);
    }

    private OperationResult createResponse(int status) {
        OperationResult response = new OperationResult();
        response.setPrepareMessage(createDefaultMessageExt());
        response.setResponseCode(status);
        response.setResponseRemark(null);
        return response;
    }

    @Test
    public void testProcessRequest() throws RemotingCommandException {

        RemotingCommand request = createEndTransactionMsgCommand(MessageSysFlag.TRANSACTION_NOT_TYPE, true);
        RemotingCommand response = endTransactionProcessor.processRequest(handlerContext, request);
        assertThat(response).isNull();
    }

    @Test
    public void testProcessRequest_RollBack() throws RemotingCommandException {
        when(transactionMsgService.rollbackMessage(any(EndTransactionRequestHeader.class))).thenReturn(createResponse(ResponseCode.SUCCESS));
        RemotingCommand request = createEndTransactionMsgCommand(MessageSysFlag.TRANSACTION_ROLLBACK_TYPE, true);
        RemotingCommand response = endTransactionProcessor.processRequest(handlerContext, request);
        assertThat(response.getCode()).isEqualTo(ResponseCode.SUCCESS);
    }

    @Test
    public void testProcessRequest_RejectCommitMessage() throws RemotingCommandException {
        when(transactionMsgService.commitMessage(any(EndTransactionRequestHeader.class))).thenReturn(createRejectResponse());
        RemotingCommand request = createEndTransactionMsgCommand(MessageSysFlag.TRANSACTION_COMMIT_TYPE, false);
        RemotingCommand response = endTransactionProcessor.processRequest(handlerContext, request);
        assertThat(response.getCode()).isEqualTo(ResponseCode.ILLEGAL_OPERATION);
    }

    @Test
    public void testProcessRequest_RejectRollBackMessage() throws RemotingCommandException {
        when(transactionMsgService.rollbackMessage(any(EndTransactionRequestHeader.class))).thenReturn(createRejectResponse());
        RemotingCommand request = createEndTransactionMsgCommand(MessageSysFlag.TRANSACTION_ROLLBACK_TYPE, false);
        RemotingCommand response = endTransactionProcessor.processRequest(handlerContext, request);
        assertThat(response.getCode()).isEqualTo(ResponseCode.ILLEGAL_OPERATION);
    }

    private MessageExt createDefaultMessageExt() {
        MessageExt messageExt = new MessageExt();
        messageExt.setMsgId("12345678");
        messageExt.setQueueId(0);
        messageExt.setCommitLogOffset(123456789L);
        messageExt.setQueueOffset(1234);
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_REAL_TOPIC, TOPIC);
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_REAL_QUEUE_ID, "0");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_TRANSACTION_PREPARED, "true");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_PRODUCER_GROUP, "testTransactionGroup");
        return messageExt;
    }

    private EndTransactionRequestHeader createEndTransactionRequestHeader(int status, boolean isCheckMsg) {
        EndTransactionRequestHeader header = new EndTransactionRequestHeader();
        header.setTopic("topic");
        header.setCommitLogOffset(123456789L);
        header.setFromTransactionCheck(isCheckMsg);
        header.setCommitOrRollback(status);
        header.setMsgId("12345678");
        header.setTransactionId("123");
        header.setProducerGroup("testTransactionGroup");
        header.setTranStateTableOffset(1234L);
        return header;
    }

    private RemotingCommand createEndTransactionMsgCommand(int status, boolean isCheckMsg) {
        EndTransactionRequestHeader header = createEndTransactionRequestHeader(status, isCheckMsg);
        RemotingCommand request = RemotingCommand.createRequestCommand(RequestCode.END_TRANSACTION, header);
        request.makeCustomHeaderToNet();
        return request;
    }

    private OperationResult createRejectResponse() {
        OperationResult response = new OperationResult();
        response.setPrepareMessage(createRejectMessageExt());
        response.setResponseCode(ResponseCode.SUCCESS);
        response.setResponseRemark(null);
        return response;
    }
    private MessageExt createRejectMessageExt() {
        MessageExt messageExt = new MessageExt();
        messageExt.setMsgId("12345678");
        messageExt.setQueueId(0);
        messageExt.setCommitLogOffset(123456789L);
        messageExt.setQueueOffset(1234);
        messageExt.setBody("body".getBytes(StandardCharsets.UTF_8));
        messageExt.setBornTimestamp(System.currentTimeMillis() - 65 * 1000);
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_REAL_QUEUE_ID, "0");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_TRANSACTION_PREPARED, "true");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_PRODUCER_GROUP, "testTransactionGroup");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_REAL_TOPIC, "TEST");
        MessageAccessor.putProperty(messageExt, MessageConst.PROPERTY_CHECK_IMMUNITY_TIME_IN_SECONDS, "60");
        return messageExt;
    }

    private AppendMessageResult createAppendMessageResult(AppendMessageStatus status) {
        AppendMessageResult result = new AppendMessageResult(status);
        result.setMsgId("12345678");
        result.setMsgNum(1);
        result.setWroteBytes(1);
        return result;
    }
}