package javaTest.simpleExample;

public class MathStuff {

    public void printLength(int x, int y, int z) {
        System.out.println(Math.sqrt(x * x + y * y + z * z));
    }

    public void printSum(int x, int y, int z) {
        System.out.println(x + y + z);
    }

    public void printMax(int x, int y, int z) {
        System.out.println(Math.max(Math.max(x, y), z));
    }
}
