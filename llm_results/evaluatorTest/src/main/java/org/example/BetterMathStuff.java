package org.example;

public class BetterMathStuff extends MathStuff{

    @Override public void printMax(Triplet triplet) {
        triplet.setX(Math.abs(triplet.getX()));
        triplet.setY(Math.abs(triplet.getY()));
        triplet.setZ(Math.abs(triplet.getZ()));

        System.out.println(Math.max(Math.max(triplet.getX(), triplet.getY()), triplet.getZ()));
    }
   
}