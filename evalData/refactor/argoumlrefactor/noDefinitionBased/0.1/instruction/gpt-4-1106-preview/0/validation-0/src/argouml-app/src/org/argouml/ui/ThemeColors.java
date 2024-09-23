public class ThemeColors {

    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    public ThemeColors(int r, int g, int b) {
        color1 = new ColorUIResource(r, r, b);
        color2 = new ColorUIResource(g, g, b);
        color3 = new ColorUIResource(b, b, b);
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