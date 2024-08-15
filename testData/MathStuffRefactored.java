package org.example;

public class MathStuff {
    FloatingPointData floatingPointData;

    public void printLength(Point pt) {
        System.out.println(Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z));
    }

    public double calcValue(){
        return (floatingPointData.getSign() ? 1 : -1)*
                floatingPointData.getMantissa() * Math.pow(2,
                floatingPointData.getExponent());
    }
}
