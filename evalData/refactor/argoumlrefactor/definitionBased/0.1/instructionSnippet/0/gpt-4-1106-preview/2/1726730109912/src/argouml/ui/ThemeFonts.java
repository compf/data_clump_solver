package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int controlStyle, int controlSize, int systemStyle, int systemSize, int windowTitleStyle, int windowTitleSize, int userStyle, int userSize, int smallStyle, int smallSize) {
        this.controlFont = new FontUIResource(fontName, controlStyle, controlSize);
        this.systemFont = new FontUIResource(fontName, systemStyle, systemSize);
        this.windowTitleFont = new FontUIResource(fontName, windowTitleStyle, windowTitleSize);
        this.userFont = new FontUIResource(fontName, userStyle, userSize);
        this.smallFont = new FontUIResource(fontName, smallStyle, smallSize);
    }

    // Getters for each font
    // ...
}