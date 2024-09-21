class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(int controlSize, int systemSize, int titleSize, int userSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, controlSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, systemSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, titleSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, userSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    // Getters and setters for fonts
}