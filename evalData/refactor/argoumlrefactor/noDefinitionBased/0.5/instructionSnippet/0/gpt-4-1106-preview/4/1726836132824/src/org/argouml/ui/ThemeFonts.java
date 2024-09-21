package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int controlStyle, int controlSize, int titleStyle, int titleSize, int smallSize) {
        controlFont = new FontUIResource(fontName, controlStyle, controlSize);
        systemFont = new FontUIResource(fontName, controlStyle, controlSize);
        windowTitleFont = new FontUIResource(fontName, titleStyle, titleSize);
        userFont = new FontUIResource(fontName, controlStyle, controlSize);
        smallFont = new FontUIResource(fontName, controlStyle, smallSize);
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