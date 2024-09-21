package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndSystemFontFamily, String userFontFamily, int regularFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndSystemFontFamily, Font.BOLD, regularFontSize);
        this.systemFont = new FontUIResource(controlAndSystemFontFamily, Font.PLAIN, regularFontSize);
        this.windowTitleFont = new FontUIResource(controlAndSystemFontFamily, Font.BOLD, regularFontSize);
        this.userFont = new FontUIResource(userFontFamily, Font.PLAIN, regularFontSize);
        this.smallFont = new FontUIResource(controlAndSystemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for the fonts
    // ...
}
