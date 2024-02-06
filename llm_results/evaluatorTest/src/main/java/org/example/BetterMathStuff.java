public class BetterMathStuff extends MathStuff{

    @Override public void printMax(int x, int y, int z) {
        this.printMax(new MathInfo(x, y, z));
    }

    public void printMax(MathInfo info) {
        info.absValues();
        System.out.println(info.getMaxValue());
    }

}