package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(FontUIResource controlFont, FontUIResource systemFont, FontUIResource windowTitleFont, FontUIResource userFont, FontUIResource smallFont) {
        this.controlFont = controlFont;
        this.systemFont = systemFont;
        this.windowTitleFont = windowTitleFont;
        this.userFont = userFont;
        this.smallFont = smallFont;
    }

    // Getters for fonts
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}