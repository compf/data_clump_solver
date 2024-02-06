public class MathInfo {
    private boolean sign;
    private double mantissa;
    private int exponent;

    public MathInfo(boolean sign, double mantissa, int exponent) {
        this.sign = sign;
        this.mantissa = mantissa;
        this.exponent = exponent;
    }

    public void absValues() {
        mantissa = Math.abs(mantissa);
        exponent = Math.abs(exponent);
    }

    public void calcValue() {
        double result = (sign ? 1 : -1) * mantissa * Math.pow(2, exponent);
        System.out.println(result);
    }

    public boolean getSign() {
        return sign;
    }

    public double getMantissa() {
        return mantissa;
    }

    public int getExponent() {
        return exponent;
    }

    public double getMaxValue() {
        return Math.max(Math.max(sign ? 1 : -1 * mantissa, mantissa), exponent);
    }
}