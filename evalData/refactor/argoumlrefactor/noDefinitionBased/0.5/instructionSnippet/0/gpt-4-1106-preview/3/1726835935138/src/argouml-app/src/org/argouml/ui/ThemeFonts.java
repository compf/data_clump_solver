package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int mainSize, int smallSize) {
        this.controlFont = new FontUIResource(fontName, Font.BOLD, mainSize);
        this.systemFont = new FontUIResource(fontName, Font.PLAIN, mainSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, mainSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, mainSize);
        this.smallFont = new FontUIResource(fontName, Font.PLAIN, smallSize);
    }

    // Getters
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }

    // Additional functionality can be added here
}