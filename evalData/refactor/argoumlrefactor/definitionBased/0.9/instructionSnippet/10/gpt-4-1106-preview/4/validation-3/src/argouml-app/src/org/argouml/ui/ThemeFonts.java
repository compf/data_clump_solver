package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFonts(String fontName, int fontSize) {
        controlFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        userFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(fontName, Font.PLAIN, fontSize - 2);
        windowTitleFont = new FontUIResource(fontName, Font.BOLD, fontSize);
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
