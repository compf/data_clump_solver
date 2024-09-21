public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font controlAndWindowFont, Font smallFont) {
        this.controlFont = new FontUIResource(controlAndWindowFont.getFamily(), Font.PLAIN, controlAndWindowFont.getSize());
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, controlAndWindowFont.getSize());
        this.windowTitleFont = new FontUIResource(controlAndWindowFont.getFamily(), Font.BOLD, controlAndWindowFont.getSize());
        this.userFont = new FontUIResource(controlAndWindowFont.getFamily(), Font.PLAIN, controlAndWindowFont.getSize());
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
