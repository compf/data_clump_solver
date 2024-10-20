public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, String systemAndSmallFontFamily, int largeFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, largeFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, largeFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}