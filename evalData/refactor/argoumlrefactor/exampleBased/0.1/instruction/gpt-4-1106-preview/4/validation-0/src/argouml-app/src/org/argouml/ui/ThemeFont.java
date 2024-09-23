package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    ThemeFont(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    FontUIResource getControlFont() { return controlFont; }
    FontUIResource getSystemFont() { return systemFont; }
    FontUIResource getWindowTitleFont() { return windowTitleFont; }
    FontUIResource getUserFont() { return userFont; }
    FontUIResource getSmallFont() { return smallFont; }
}