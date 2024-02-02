package org.example;

public class Library {

    private MathStuffProperties properties;

    public boolean someLibraryMethod() {
        MathStuff stuff=new MathStuff(properties);
        if(properties.isSign()){
            stuff.calcValue();
        }
       System.out.println(properties.isSign());
       System.out.println(properties.getMantissa());
       System.out.println(properties.getExponent());
        return true;
    }

    public Library(boolean sign, double mantissa, int exponent) {
        this.properties = new MathStuffProperties(sign, mantissa, exponent);
    }
}