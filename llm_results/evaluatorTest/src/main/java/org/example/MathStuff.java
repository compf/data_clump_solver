package org.example;

public class MathStuff {
    private MathStuffProperties properties;

    public void printLength(int x, int y, int z) {
        System.out.println(Math.sqrt(x * x + y * y + z * z));
    }

    public MathStuff(boolean sign, double mantissa, int exponent){
        this.properties = new MathStuffProperties(sign, mantissa, exponent);
    }

    public MathStuff(){
        this.properties = new MathStuffProperties(true, 0, 1);
    }

    public void printSum(int x, int y, int z) {
        System.out.println(x + y + z);
    }

    public void printMax(int x, int y, int z) {
        System.out.println(Math.max(Math.max(x, y), z));
    }

    public double calcValue(){
        boolean sign = properties.isSign();
        double mantissa = properties.getMantissa();
        int exponent = properties.getExponent();
        return (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);
    }
}