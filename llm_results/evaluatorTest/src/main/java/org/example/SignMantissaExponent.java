package org.example;

public class SignMantissaExponent {
    private boolean sign;
    private double mantissa;
    private int exponent;

    public SignMantissaExponent(boolean sign, double mantissa, int exponent) {
        this.sign = sign;
        this.mantissa = mantissa;
        this.exponent = exponent;
    }

    public boolean isSign() {
        return sign;
    }

    public double getMantissa() {
        return mantissa;
    }

    public int getExponent() {
        return exponent;
    }

    public double getValue() {
        return (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);
    }
}