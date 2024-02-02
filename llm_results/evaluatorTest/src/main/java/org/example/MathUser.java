package org.example;

public class MathUser {
    private Exponential exponential;

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(new Triplet(5,6,4));
    }
    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        Triplet triplet = new Triplet(4, 3, -80);
        if(exponential.getSign()){
            triplet.setZ(triplet.getZ()+exponential.getExponent());
        }
        else{
            triplet.setX((int)(triplet.getX()*exponential.getMantissa()));
        }
        stuff.printMax(triplet);
    }
    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.printSum(new Triplet(hashCode(), hashCode(), hashCode()));
    }
}