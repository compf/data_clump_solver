class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    ThemeFont(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    FontUIResource getControlFont() { return controlFont; }
    FontUIResource getSystemFont() { return systemFont; }
    FontUIResource getWindowTitleFont() { return windowTitleFont; }
    FontUIResource getUserFont() { return userFont; }
    FontUIResource getSmallFont() { return smallFont; }
}