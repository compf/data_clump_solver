package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, regularSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
    }

    // Getters for the fonts
}
