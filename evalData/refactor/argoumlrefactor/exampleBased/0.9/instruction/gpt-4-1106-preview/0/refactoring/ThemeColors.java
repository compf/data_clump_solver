class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    ThemeColors(int colorValue) {
        color1 = new ColorUIResource(colorValue, colorValue, colorValue + 51);
        color2 = new ColorUIResource(colorValue + 51, colorValue + 51, colorValue + 102);
        color3 = new ColorUIResource(colorValue + 102, colorValue + 102, colorValue + 153);
    }

    // Add any additional methods or logic here as needed, like getters or color combination methods.
}