package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for fonts
}