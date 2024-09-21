package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int fontStyle, int[] fontSizes) {
        controlFont = new FontUIResource(fontName, fontStyle, fontSizes[0]);
        systemFont = new FontUIResource(fontName, fontStyle, fontSizes[1]);
        userFont = new FontUIResource(fontName, fontStyle, fontSizes[2]);
        smallFont = new FontUIResource(fontName, fontStyle, fontSizes[3]);
    }

    // Getters for the fonts
}
