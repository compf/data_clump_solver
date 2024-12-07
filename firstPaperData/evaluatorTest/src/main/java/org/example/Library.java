package org.example;

public class Library {
    public boolean someLibraryMethod() {
        MathStuff stuff=new MathStuff(new NumberTriplet(true, 1.0, 1));
        if(sign){
            stuff.calcValue();
        }
       System.out.println(sign);
       System.out.println(mantissa);
       System.out.println(exponent);
        return true;
    }
    private NumberTriplet triplet = new NumberTriplet(true, 1.0, 1);
    private boolean sign = triplet.getSign();
    private double mantissa = triplet.getMantissa();
    private int exponent = triplet.getExponent();
}
