package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String otherFontFamily, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(otherFontFamily, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, regularSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(otherFontFamily, Font.PLAIN, smallSize);
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