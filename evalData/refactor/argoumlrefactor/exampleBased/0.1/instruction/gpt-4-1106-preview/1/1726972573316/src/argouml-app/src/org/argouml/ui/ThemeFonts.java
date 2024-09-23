public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for all fonts
}
