class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    ThemeFonts() {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, 14);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 14);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, 12);
    }

    ThemeFonts(String controlFontName, String systemFontName, int style, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontName, style, largeSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFontName, style, largeSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
    }

    // Add any additional methods or logic here as needed, like getters or font style methods.
}