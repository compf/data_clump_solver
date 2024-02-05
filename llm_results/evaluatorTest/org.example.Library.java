package org.example;

public class Library {
    private MathStuff mathStuff;

    public boolean someLibraryMethod() {
        mathStuff=new MathStuff(sign, mantissa, exponent);
        if(sign){
            mathStuff.calcValue();
        }
       System.out.println(sign);
       System.out.println(mantissa);
       System.out.println(exponent);
        return true;
    }
    private boolean sign;
    private double mantissa;
    private int exponent;
}