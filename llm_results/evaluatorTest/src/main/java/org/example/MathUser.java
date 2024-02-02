package org.example;

public class MathUser {

    private MathStuffProperties properties;

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(5,6,4);
    }

    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        int x1=4;
        int y1=3;
        int z1=-80;
        if(properties.isSign()){
            z1=z1+properties.getExponent();
        }
        else{
            x1=(int)(x1*properties.getMantissa());
        }
        stuff.printMax(x1, y1, z1);
    }

    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.printSum(hashCode(), hashCode(), hashCode());
    }

    public MathUser(boolean sign, double mantissa, int exponent) {
        this.properties = new MathStuffProperties(sign, mantissa, exponent);
    }
}