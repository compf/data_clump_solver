public class ThemeFonts {

    private final FontUIResource controlFont, systemFont, userFont, menuFont, subFont, windowTitleFont;

    public ThemeFonts(String fontName, String systemFontName, int normalStyle, int boldStyle, int normalSize, int smallSize) {
        controlFont = new FontUIResource(fontName, normalStyle, normalSize);
        systemFont = new FontUIResource(systemFontName, normalStyle, normalSize);
        userFont = new FontUIResource(fontName, normalStyle, normalSize);
        menuFont = new FontUIResource(fontName, normalStyle, normalSize);
        subFont = new FontUIResource(systemFontName, normalStyle, smallSize);
        windowTitleFont = new FontUIResource(fontName, boldStyle, normalSize);
    }

    // Getter methods
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getMenuFont() { return menuFont; }
    public FontUIResource getSubFont() { return subFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}