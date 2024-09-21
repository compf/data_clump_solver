package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public final class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int smallFontSize, int regularFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularFontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, regularFontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, regularFontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularFontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getter methods for fonts can be added here
}