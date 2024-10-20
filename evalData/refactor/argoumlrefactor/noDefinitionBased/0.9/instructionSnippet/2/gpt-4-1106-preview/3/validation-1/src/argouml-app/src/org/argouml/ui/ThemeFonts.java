package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int fontStyle, int fontSize) {
        this.controlFont = new FontUIResource(new Font(fontName, fontStyle, fontSize));
        this.systemFont = new FontUIResource(new Font(fontName, fontStyle, fontSize));
        this.windowTitleFont = new FontUIResource(new Font(fontName, fontStyle, fontSize));
        this.userFont = new FontUIResource(new Font(fontName, fontStyle, fontSize));
        this.smallFont = new FontUIResource(new Font(fontName, fontStyle, fontSize - 2));
    }

    // Getters
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}
