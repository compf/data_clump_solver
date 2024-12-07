package org.example;

public class MathStuff {
    private NumberTriplet triplet;

    public void printLength(NumberTriplet triplet) {
        System.out.println(Math.sqrt(triplet.getX() * triplet.getX() + triplet.getY() * triplet.getY() + triplet.getZ() * triplet.getZ()));
    }

    public MathStuff(NumberTriplet triplet){
        this.triplet = triplet;
    }

    public MathStuff(){
        this.triplet = new NumberTriplet(true, 0.0, 1);
    }

    public void printSum(NumberTriplet triplet) {
        System.out.println(triplet.getX() + triplet.getY() + triplet.getZ());
    }

    public void printMax(NumberTriplet triplet) {
        System.out.println(Math.max(Math.max(triplet.getX(), triplet.getY()), triplet.getZ()));
    }

    public double calcValue(){
        return (triplet.getSign() ? 1 : -1) * triplet.getMantissa() * Math.pow(2, triplet.getExponent());
    }
}
