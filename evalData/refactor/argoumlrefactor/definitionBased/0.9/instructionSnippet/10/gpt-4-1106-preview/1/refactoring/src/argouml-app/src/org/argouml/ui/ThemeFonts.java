package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, int controlAndUserFontSize, String otherFontFamily, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.systemFont = new FontUIResource(otherFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, controlAndUserFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.smallFont = new FontUIResource(otherFontFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getMenuFont() {
        return controlFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}