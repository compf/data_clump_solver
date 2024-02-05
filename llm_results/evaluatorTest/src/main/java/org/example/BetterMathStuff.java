package org.example;

public class BetterMathStuff extends MathStuff{

    @Override public void printMax(TripleIntegers tripleIntegers) {
        tripleIntegers.setValues(Math.abs(tripleIntegers.getX()),
                                Math.abs(tripleIntegers.getY()),
                                Math.abs(tripleIntegers.getZ()));
        System.out.println(tripleIntegers.max());
    }
   
}