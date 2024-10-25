public class ThemeColors {

    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int shade, int tint, int tone) {
        this.color1 = new ColorUIResource(shade, shade, shade + 51);
        this.color2 = new ColorUIResource(tint, tint, tint + 51);
        this.color3 = new ColorUIResource(tone, tone, tone + 51);
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