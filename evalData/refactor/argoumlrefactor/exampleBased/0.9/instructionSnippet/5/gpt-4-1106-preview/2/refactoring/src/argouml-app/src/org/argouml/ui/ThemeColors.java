public class ThemeColors {
    private ColorUIResource primary1, primary2, primary3;

    public ThemeColors(int color1, int color2, int color3) {
        this.primary1 = new ColorUIResource(color1, color1, color1 + 51);
        this.primary2 = new ColorUIResource(color2, color2, color2 + 51);
        this.primary3 = new ColorUIResource(color3, color3, color3 + 51);
    }

    // Getter methods, etc.
}