public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(FontUIResource controlAndUserFont, FontUIResource smallFont) {
        this.controlFont = new FontUIResource(controlAndUserFont.getFamily(), Font.PLAIN, controlAndUserFont.getSize());
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, controlAndUserFont.getSize());
        this.windowTitleFont = new FontUIResource(controlAndUserFont.getFamily(), Font.BOLD, controlAndUserFont.getSize());
        this.userFont = new FontUIResource(controlAndUserFont.getFamily(), Font.PLAIN, controlAndUserFont.getSize());
        this.smallFont = new FontUIResource(smallFont.getFamily(), Font.PLAIN, smallFont.getSize());
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

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    // Additional methods to retrieve and manipulate fonts could be added here
}
