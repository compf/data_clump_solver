package org.example;

public class MathUser {
    private MathStuffParams mathStuffParams;

    public void doLengthCalc() {
        MathStuff stuff = new MathStuff(mathStuffParams);
        stuff.printLength(new MathStuffParams(5, 6, 4));
    }

    public void doMaxStuff() {
        MathStuff stuff = new MathStuff(mathStuffParams);
        int x1 = 4;
        int y1 = 3;
        int z1 = -80;
        if (mathStuffParams.isSign()) {
            z1 = z1 + mathStuffParams.getExponent();
        } else {
            x1 = (int) (x1 * mathStuffParams.getMantissa());
        }
        stuff.printMax(new MathStuffParams(x1, y1, z1));
    }

    public void executeSumOperation() {
        MathStuff stuff = new MathStuff(mathStuffParams);
        stuff.printSum(new MathStuffParams(hashCode(), hashCode(), hashCode()));
    }
}