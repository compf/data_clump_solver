package org.example;

public class MathUser {
    private SignMantissaExponent sme;

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(new TripleIntegers(5, 6, 4));
    }
    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        TripleIntegers tripleIntegers = new TripleIntegers(4, 3, -80);
        if(sme.isSign()){
            tripleIntegers.setZ(tripleIntegers.getZ() + sme.getExponent());
        }
        else{
            tripleIntegers.setX((int)(tripleIntegers.getX() * sme.getMantissa()));
        }
        stuff.printMax(tripleIntegers);
    }
    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        TripleIntegers tripleIntegers = new TripleIntegers(hashCode(), hashCode(), hashCode());
        stuff.printSum(tripleIntegers);
    }
}