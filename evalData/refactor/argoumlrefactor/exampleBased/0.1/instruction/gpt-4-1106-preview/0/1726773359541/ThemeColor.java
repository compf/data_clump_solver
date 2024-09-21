class ThemeColor {
    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    ThemeColor(int colorBase, int colorMid, int colorHigh) {
        this.color1 = new ColorUIResource(colorBase, colorBase, colorBase + 51);
        this.color2 = new ColorUIResource(colorMid, colorMid, colorMid + 51);
        this.color3 = new ColorUIResource(colorHigh, colorHigh, colorHigh + 51);
    }

    ColorUIResource getColor1() { return color1; }
    ColorUIResource getColor2() { return color2; }
    ColorUIResource getColor3() { return color3; }
}