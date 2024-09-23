package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int controlSize, int systemSize, int titleSize, int userSize, int smallSize) {
        this.controlFont = new FontUIResource(fontName, Font.BOLD, controlSize);
        this.systemFont = new FontUIResource(fontName, Font.PLAIN, systemSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, titleSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, userSize);
        this.smallFont = new FontUIResource(fontName, Font.PLAIN, smallSize);
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