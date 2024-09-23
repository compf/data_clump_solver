class ThemeColors {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    ThemeColors(int shade1, int shade2, int shade3) {
        this.primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        this.primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        this.primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}