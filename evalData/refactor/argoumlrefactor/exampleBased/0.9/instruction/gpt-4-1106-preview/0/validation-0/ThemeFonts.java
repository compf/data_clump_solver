class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    ThemeFonts() {
        this("SansSerif", "Dialog", Font.PLAIN, 14, 12);
    }

    ThemeFonts(String controlFontName, String systemFontName, int style, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontName, style, largeSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFontName, style, largeSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
    }

    FontUIResource getControlFont() {
        return controlFont;
    }

    FontUIResource getSystemFont() {
        return systemFont;
    }

    FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    FontUIResource getUserFont() {
        return userFont;
    }

    FontUIResource getSmallFont() {
        return smallFont;
    }
}