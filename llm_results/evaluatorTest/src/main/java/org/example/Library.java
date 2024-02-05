package org.example;

public class Library {
    private MathStuffParams mathStuffParams;

    public boolean someLibraryMethod() {
        MathStuff stuff = new MathStuff(mathStuffParams);
        if (mathStuffParams.isSign()) {
            stuff.calcValue();
        }
        System.out.println(mathStuffParams.isSign());
        System.out.println(mathStuffParams.getMantissa());
        System.out.println(mathStuffParams.getExponent());
        return true;
    }
}