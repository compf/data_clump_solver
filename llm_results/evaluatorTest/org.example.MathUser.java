package org.example;

public class MathUser {
    private MathStuff mathStuff;
    private boolean sign;
    private double mantissa;
    private int exponent;
    
    public void doLengthCalc(){
        mathStuff=new MathStuff();
        mathStuff.printLength(5,6,4);
    }
    
    public void doMaxStuff(){
        mathStuff=new MathStuff();
        int x1=4;
        int y1=3;
        int z1=-80;
        if(sign){
            z1=z1+exponent;
        }
        else{
            x1=(int)(x1*mantissa);
        }
        mathStuff.printMax(x1, y1, z1);
    }
    
    public void executeSumOperation(){
        mathStuff=new MathStuff();
        mathStuff.printSum(hashCode(), hashCode(), hashCode());
    }
}