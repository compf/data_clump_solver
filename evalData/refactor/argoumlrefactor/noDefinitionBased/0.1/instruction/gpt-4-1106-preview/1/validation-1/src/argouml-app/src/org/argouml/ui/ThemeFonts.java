public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize - 2);
    }

    public FontUIResource createWindowTitleFont(int style) {
        return new FontUIResource(controlFont.getFontName(), style, controlFont.getSize());
    }

    public FontUIResource createUserFont() {
        return userFont;
    }

    public FontUIResource createSmallFont(int size) {
        return new FontUIResource(smallFont.getFontName(), smallFont.getStyle(), size);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }
}