package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters
    // ...
}
