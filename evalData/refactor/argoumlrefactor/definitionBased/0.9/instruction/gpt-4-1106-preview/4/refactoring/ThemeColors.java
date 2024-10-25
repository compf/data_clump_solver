public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int colorStart, int colorMiddle, int colorEnd) {
        this.color1 = new ColorUIResource(colorStart, colorStart, colorStart + 51);
        this.color2 = new ColorUIResource(colorMiddle, colorMiddle, colorMiddle + 51);
        this.color3 = new ColorUIResource(colorEnd, colorEnd, colorEnd + 51);
    }

    public ColorUIResource getColor1() {
        return color1;
    }

    public ColorUIResource getColor2() {
        return color2;
    }

    public ColorUIResource getColor3() {
        return color3;
    }
}
