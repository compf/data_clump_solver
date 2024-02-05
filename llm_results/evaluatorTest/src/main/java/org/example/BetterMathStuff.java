package org.example;

public class BetterMathStuff extends MathStuff{

    @Override public void printMax(MathStuffParams params) {
        int x = Math.abs(params.getX());
        int y = Math.abs(params.getY());
        int z = Math.abs(params.getZ());

        System.out.println(Math.max(Math.max(x, y), z));
    }

}