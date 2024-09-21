class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    ThemeFont(String controlFontName, String systemFontName, int controlFontSize, int systemFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, systemFontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, controlFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, controlFontSize - 2);
    }

    public String getName() { return "Custom Fonts"; }
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getMenuTextFont() { return controlFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}