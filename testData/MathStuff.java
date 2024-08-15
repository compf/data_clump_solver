package org.example;

public class MathStuff {
    private boolean sign;
    private double mantissa;
    private int exponent;

    public void printLength(int x, int y, int z) {
        System.out.println(Math.sqrt(x * x + y * y + z * z));
    }

    public double calcValue(){
        return (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);
    }
}
