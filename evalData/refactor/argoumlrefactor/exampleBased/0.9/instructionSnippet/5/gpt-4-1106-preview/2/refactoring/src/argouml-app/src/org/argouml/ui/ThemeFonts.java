public class ThemeFonts {
    private FontUIResource controlFont, systemFont, userFont, windowTitleFont, smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int normalStyle, int boldStyle, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, normalStyle, largeSize);
        this.systemFont = new FontUIResource(systemFontName, normalStyle, largeSize);
        this.windowTitleFont = new FontUIResource(controlFontName, boldStyle, largeSize);
        this.userFont = new FontUIResource(controlFontName, normalStyle, largeSize);
        this.smallFont = new FontUIResource(systemFontName, normalStyle, smallSize);
    }

    // Getter methods, etc.
}