package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int controlFontStyle, int controlFontSize, int windowTitleFontStyle, int windowTitleFontSize, int userFontStyle, int userFontSize, int smallFontStyle, int smallFontSize) {
        controlFont = new FontUIResource(controlFontFamily, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontFamily, userFontStyle, userFontSize);
        windowTitleFont = new FontUIResource(controlFontFamily, windowTitleFontStyle, windowTitleFontSize);
        userFont = new FontUIResource(controlFontFamily, userFontStyle, userFontSize);
        smallFont = new FontUIResource(systemFontFamily, smallFontStyle, smallFontSize);
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