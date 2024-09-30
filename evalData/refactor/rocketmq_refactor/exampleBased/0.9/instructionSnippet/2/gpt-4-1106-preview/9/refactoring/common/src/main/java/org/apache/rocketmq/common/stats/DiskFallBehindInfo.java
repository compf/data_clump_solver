package org.apache.rocketmq.common.stats;

public class DiskFallBehindInfo {
    private long fallBehindTime;
    private long fallBehindSize;

    public DiskFallBehindInfo(long fallBehindTime, long fallBehindSize) {
        this.fallBehindTime = fallBehindTime;
        this.fallBehindSize = fallBehindSize;
    }

    public long getFallBehindTime() {
        return fallBehindTime;
    }

    public long getFallBehindSize() {
        return fallBehindSize;
    }
}