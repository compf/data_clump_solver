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
        controlFont = new FontUIResource(fontName, Font.PLAIN, controlSize);
        systemFont = new FontUIResource(fontName, Font.PLAIN, systemSize);
        windowTitleFont = new FontUIResource(fontName, Font.BOLD, titleSize);
        userFont = new FontUIResource(fontName, Font.PLAIN, userSize);
        smallFont = new FontUIResource(fontName, Font.PLAIN, smallSize);
    }

    // Getters for each font type
}