package org.example;

public class Exponential {
    private boolean sign;
    private double mantissa;
    private int exponent;

    public Exponential(boolean sign, double mantissa, int exponent) {
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

    public void setSign(boolean sign) {
        this.sign = sign;
    }

    public void setMantissa(double mantissa) {
        this.mantissa = mantissa;
    }

    public void setExponent(int exponent) {
        this.exponent = exponent;
    }
}