package org.example;

public class MathStuff {
    private Exponential exponential;

    public void printLength(Triplet triplet) {
        System.out.println(Math.sqrt(triplet.getX() * triplet.getX() + triplet.getY() * triplet.getY() + triplet.getZ() * triplet.getZ()));
    }
    public MathStuff(Exponential exponential){
        this.exponential=exponential;
    }
    public MathStuff(){
        this.exponential=new Exponential(true,0,1);
    }

    public void printSum(Triplet triplet) {
        System.out.println(triplet.getX() + triplet.getY() + triplet.getZ());
    }

    public void printMax(Triplet triplet) {
        System.out.println(Math.max(Math.max(triplet.getX(), triplet.getY()), triplet.getZ()));
    }
    public double calcValue(){
        return (exponential.getSign() ? 1 : -1) * exponential.getMantissa() * Math.pow(2, exponential.getExponent());
    }
}