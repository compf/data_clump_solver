public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(int baseFontSize, String controlFontName, String systemFontName, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, baseFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, baseFontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, baseFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, baseFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
