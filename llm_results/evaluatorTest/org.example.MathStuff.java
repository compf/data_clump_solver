package org.example;

public class MathStuff {
    private boolean sign;
    private double mantissa;
    private int exponent;
    
    public MathStuff(boolean sign, double mantissa, int exponent){
        this.sign=sign;
        this.mantissa=mantissa;
        this.exponent=exponent;
    }
    
    public MathStuff(){
        this.sign=true;
        this.mantissa=0;
        this.exponent=1;
    }

    public void printLength(int x, int y, int z) {
        System.out.println(Math.sqrt(x * x + y * y + z * z));
    }

    public void printSum(int x, int y, int z) {
        System.out.println(x + y + z);
    }

    public void printMax(int x, int y, int z) {
        System.out.println(Math.max(Math.max(x, y), z));
    }
    public double calcValue(){
        return (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);
    }
}