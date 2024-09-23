package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(fontName, Font.BOLD, fontSize);
        this.systemFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(fontName, Font.PLAIN, smallFontSize);
    }

    // Getters for each font

}