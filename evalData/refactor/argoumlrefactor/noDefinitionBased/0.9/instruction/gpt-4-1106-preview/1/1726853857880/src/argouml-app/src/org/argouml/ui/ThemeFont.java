package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(String controlAndWindowFontFamily, String systemAndSmallFontFamily, int controlAndWindowFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndWindowFontFamily, Font.PLAIN, controlAndWindowFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, controlAndWindowFontSize);
        this.windowTitleFont = new FontUIResource(controlAndWindowFontFamily, Font.BOLD, controlAndWindowFontSize);
        this.userFont = new FontUIResource(controlAndWindowFontFamily, Font.PLAIN, controlAndWindowFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
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

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}