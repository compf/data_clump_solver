import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlName, String systemName, int plainStyle, int boldStyle, int controlSize, int smallSize) {
        controlFont = new FontUIResource(controlName, plainStyle, controlSize);
        systemFont = new FontUIResource(systemName, plainStyle, controlSize);
        windowTitleFont = new FontUIResource(controlName, boldStyle, controlSize);
        userFont = new FontUIResource(controlName, plainStyle, controlSize);
        smallFont = new FontUIResource(systemName, plainStyle, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}