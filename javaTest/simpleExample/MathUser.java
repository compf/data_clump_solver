package javaTest.simpleExample;

public class MathUser {

    public void doLengthCalc(){
        MathStuff stuff=new MathStuff();
        stuff.printLength(5,6,4);
    }
    public void doMaxStuff(){
        MathStuff stuff=new MathStuff();
        int x1=4;
        int y1=3;
        int z1=-80;
        stuff.printMax(x1,y1,z1);
    }
    public void executeSumOperation(){
        MathStuff stuff=new MathStuff();
        stuff.printSum(hashCode(), hashCode(), hashCode());
    }
}
