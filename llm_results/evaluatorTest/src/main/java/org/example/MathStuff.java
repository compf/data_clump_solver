package org.example;

public class MathStuff {
    private MathStuffParams mathStuffParams;

    public MathStuff(MathStuffParams mathStuffParams) {
        this.mathStuffParams = mathStuffParams;
    }

    public void printLength(MathStuffParams params) {
        System.out.println(Math.sqrt(params.getX() * params.getX() + params.getY() * params.getY() + params.getZ() * params.getZ()));
    }

    public void printSum(MathStuffParams params) {
        System.out.println(params.getX() + params.getY() + params.getZ());
    }

    public void printMax(MathStuffParams params) {
        System.out.println(Math.max(Math.max(params.getX(), params.getY()), params.getZ()));
    }

    public double calcValue() {
        return (mathStuffParams.isSign() ? 1 : -1) * mathStuffParams.getMantissa() * Math.pow(2, mathStuffParams.getExponent());
    }
}