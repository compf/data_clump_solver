package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, regularSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
    }

    // Getters for the font resources
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}