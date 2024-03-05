package org.example;

public class MathUser {
    private NumberTriplet triplet;

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(new NumberTriplet(5,6,4));
    }

    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        NumberTriplet triplet = new NumberTriplet(4,3,-80);
        if(triplet.getSign()){
            triplet.setZ(triplet.getZ() + triplet.getExponent());
        }
        else{
            triplet.setX((int)(triplet.getX()*triplet.getMantissa()));
        }
        stuff.printMax(triplet);
    }

    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.printSum(new NumberTriplet(hashCode(), hashCode(), hashCode()));
    }
}
