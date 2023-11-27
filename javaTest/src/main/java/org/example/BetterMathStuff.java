package org.example;

public class BetterMathStuff extends MathStuff{

    @Override public void printMax(int x, int y, int z) {
        //MathStuff stuff=new MathStuff();
        //stuff.printMax(x, y, z);
        x=Math.abs(x);
        y=Math.abs(y);
        z=Math.abs(z);

        System.out.println(Math.max(Math.max(x, y), z));
    }
   
}
