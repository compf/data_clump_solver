class ThemeColors {

    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    public ThemeColors(int factor1, int factor2, int factor3) {
        color1 = new ColorUIResource(factor1, factor1, factor1 + 51);
        color2 = new ColorUIResource(factor2, factor2, factor2 + 51);
        color3 = new ColorUIResource(factor3, factor3, factor3 + 51);
    }

    // Getters for each color
}