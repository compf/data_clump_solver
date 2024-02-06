public class MathStuff {
    
    public void printLength(MathInfo info) {
        System.out.println(Math.sqrt(info.getX() * info.getX() + info.getY() * info.getY() + info.getZ() * info.getZ()));
    }

    public void printSum(MathInfo info) {
        System.out.println(info.getX() + info.getY() + info.getZ());
    }

    public void printMax(MathInfo info) {
        System.out.println(info.getMaxValue());
    }
}