package org.example;

public class MathUser {
    private boolean sign;
    private double mantissa;
    private int exponent;
    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(5,6,4);
    }
    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        int x1=4;
        int y1=3;
        int z1=-80;
        if(sign){
            z1=z1+exponent;
        }
        else{
            x1=(int)(x1*mantissa);
        }
        stuff.printMax(x1, y1, z1);
    }
    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.printSum(hashCode(), hashCode(), hashCode());
    }
}
