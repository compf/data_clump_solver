public class Library {
    private MathInfo mathInfo;

    public Library(boolean sign, double mantissa, int exponent) {
        this.mathInfo = new MathInfo(sign, mantissa, exponent);
    }

    public boolean someLibraryMethod() {
        if(mathInfo.getSign()){
            mathInfo.calcValue();
        }
        System.out.println(mathInfo.getSign());
        System.out.println(mathInfo.getMantissa());
        System.out.println(mathInfo.getExponent());
        return true;
    }
}