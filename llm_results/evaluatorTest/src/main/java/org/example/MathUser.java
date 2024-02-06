public class MathUser {
    private MathInfo mathInfo;

    public MathUser(boolean sign, double mantissa, int exponent) {
        this.mathInfo = new MathInfo(sign, mantissa, exponent);
    }

    public void doLengthCalc() {
        mathInfo.printLength(new MathInfo(5, 6, 4));
    }

    public void doMaxStuff() {
        int x1 = 4;
        int y1 = 3;
        int z1 = -80;
        if (mathInfo.getSign()) {
            z1 = z1 + mathInfo.getExponent();
        } else {
            x1 = (int) (x1 * mathInfo.getMantissa());
        }
        mathInfo.printMax(new MathInfo(x1, y1, z1));
    }

    public void executeSumOperation() {
        mathInfo.printSum(new MathInfo(hashCode(), hashCode(), hashCode()));
    }
}
