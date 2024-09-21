class ThemeColor {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    ThemeColor(int shade1, int shade2, int shade3) {
        primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }

    public ColorUIResource getSecondary1() { return primary1; }
    public ColorUIResource getSecondary2() { return primary2; }
    public ColorUIResource getSecondary3() { return primary3; }
}