import java.awt.Font;
import javax.swing.plaf.FontUIResource;

// Removed the ThemeFont class as it was causing a duplicate class error.


    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFont(String controlAndUserFontFamily, String systemAndSmallFontFamily, int normalSize, int smallSize) {
        controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, normalSize);
        systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, normalSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, normalSize);
        userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, normalSize);
        smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}