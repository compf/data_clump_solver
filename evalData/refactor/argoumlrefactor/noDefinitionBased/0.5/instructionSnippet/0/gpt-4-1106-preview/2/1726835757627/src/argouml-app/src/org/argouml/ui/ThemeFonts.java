package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font controlAndSystemFont, Font windowTitleFont, Font smallFont) {
        this.controlFont = new FontUIResource(controlAndSystemFont);
        this.systemFont = new FontUIResource(controlAndSystemFont);
        this.windowTitleFont = new FontUIResource(windowTitleFont);
        this.userFont = new FontUIResource(controlAndSystemFont);
        this.smallFont = new FontUIResource(smallFont);
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