package org.apache.rocketmq.store.stats;

public class StateGetterInfo {

    private StateGetter producerStateGetter;
    private StateGetter consumerStateGetter;

    public StateGetter getProducerStateGetter() {
        return producerStateGetter;
    }

    public void setProducerStateGetter(StateGetter producerStateGetter) {
        this.producerStateGetter = producerStateGetter;
    }

    public StateGetter getConsumerStateGetter() {
        return consumerStateGetter;
    }

    public void setConsumerStateGetter(StateGetter consumerStateGetter) {
        this.consumerStateGetter = consumerStateGetter;
    }
}