package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndWindowTitleFontFamily, String systemAndUserFontFamily, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndWindowTitleFontFamily, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlAndWindowTitleFontFamily, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}