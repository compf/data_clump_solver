package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int plainStyle, int size, int boldStyle, int smallSize) {
        this.controlFont = new FontUIResource(fontName, plainStyle, size);
        this.systemFont = new FontUIResource(fontName, plainStyle, size);
        this.windowTitleFont = new FontUIResource(fontName, boldStyle, size);
        this.userFont = new FontUIResource(fontName, plainStyle, size);
        this.smallFont = new FontUIResource(fontName, plainStyle, smallSize);
    }

    // Getters for the fonts
    // ...
}