package org.example;

public class MathProperties {
    private boolean sign;
    private double mantissa;
    private int exponent;

    public MathProperties(boolean sign, double mantissa, int exponent) {
        this.sign = sign;
        this.mantissa = mantissa;
        this.exponent = exponent;
    }

    public boolean getSign() {
        return sign;
    }

    public double getMantissa() {
        return mantissa;
    }

    public int getExponent() {
        return exponent;
    }
}
