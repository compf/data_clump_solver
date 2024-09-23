class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    ThemeFont(String controlAndUserFontFamily, String systemAndSmallFontFamily, int mainFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, mainFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, mainFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, mainFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, mainFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}