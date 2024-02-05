package org.example;

public class Library {
    private SignMantissaExponent sme;

    public boolean someLibraryMethod() {
        MathStuff stuff=new MathStuff(sme);
        if(sme.isSign()){
            stuff.calcValue();
        }
       System.out.println(sme.isSign());
       System.out.println(sme.getMantissa());
       System.out.println(sme.getExponent());
        return true;
    }

    public Library(boolean sign, double mantissa, int exponent) {
        this.sme = new SignMantissaExponent(sign, mantissa, exponent);
    }
}