package org.example;

public class MathStuff {
    private SignMantissaExponent sme;

    public void printLength(TripleIntegers tripleIntegers) {
        System.out.println(tripleIntegers.length());
    }

    public MathStuff(SignMantissaExponent sme){
        this.sme = sme;
    }
    public MathStuff(){
        this.sme = new SignMantissaExponent(true,0,1);
    }

    public void printSum(TripleIntegers tripleIntegers) {
        System.out.println(tripleIntegers.sum());
    }

    public void printMax(TripleIntegers tripleIntegers) {
        System.out.println(tripleIntegers.max());
    }
    public double calcValue(){
        return sme.getValue();
    }
}