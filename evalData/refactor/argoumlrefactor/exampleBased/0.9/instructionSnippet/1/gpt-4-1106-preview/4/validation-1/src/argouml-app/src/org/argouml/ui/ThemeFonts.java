package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {
    private FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFonts(String fontName, int fontWeight, int fontSize) {
        this.controlFont = new FontUIResource(fontName, fontWeight, fontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, fontSize - 2);
    }

    public FontUIResource getControlTextFont() { return controlFont; }
    public FontUIResource getSystemTextFont() { return systemFont; }
    public FontUIResource getUserTextFont() { return userFont; }
    public FontUIResource getMenuTextFont() { return getControlTextFont(); }
    public FontUIResource getSubTextFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}