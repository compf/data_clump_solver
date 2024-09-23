public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, String systemAndSmallFontFamily, int controlAndWindowTitleFontStyle, int controlAndUserFontSize, int systemAndSmallFontStyle, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, controlAndWindowTitleFontStyle, controlAndUserFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, systemAndSmallFontStyle, controlAndUserFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, controlAndWindowTitleFontStyle, controlAndUserFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, systemAndSmallFontStyle, controlAndUserFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, systemAndSmallFontStyle, smallFontSize);
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