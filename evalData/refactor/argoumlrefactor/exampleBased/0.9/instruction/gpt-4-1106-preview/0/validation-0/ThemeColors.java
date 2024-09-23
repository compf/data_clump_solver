class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    ThemeColors(int base, int increasedBy51, int increasedBy102) {
        color1 = new ColorUIResource(base, base, increasedBy51);
        color2 = new ColorUIResource(increasedBy51, increasedBy51, increasedBy102);
        color3 = new ColorUIResource(increasedBy102, increasedBy102, base);
    }

    ColorUIResource getColor1() {
        return color1;
    }

    ColorUIResource getColor2() {
        return color2;
    }

    ColorUIResource getColor3() {
        return color3;
    }
}