package org.example;

public class BetterMathStuff extends MathStuff{

    @Override public void printMax(NumberTriplet triplet) {
        //MathStuff stuff=new MathStuff();
        //stuff.printMax(x, y, z);
        int x = Math.abs(triplet.getX());
        int y = Math.abs(triplet.getY());
        int z = Math.abs(triplet.getZ());

        System.out.println(Math.max(Math.max(x, y), z));
    }
   
}
