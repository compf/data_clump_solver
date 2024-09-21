package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, largeSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, largeSize + 2);
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

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
