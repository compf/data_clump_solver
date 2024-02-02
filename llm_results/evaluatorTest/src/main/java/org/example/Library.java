package org.example;

public class Library {
    private Exponential exponential;

    public boolean someLibraryMethod() {
        MathStuff stuff=new MathStuff(exponential);
        if(exponential.getSign()){
            stuff.calcValue();
        }
       System.out.println(exponential.getSign());
       System.out.println(exponential.getMantissa());
       System.out.println(exponential.getExponent());
        return true;
    }
    
    public Library(boolean sign, double mantissa, int exponent) {
        this.exponential = new Exponential(sign, mantissa, exponent);
    }
}