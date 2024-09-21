package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, String systemAndSmallFontFamily, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}