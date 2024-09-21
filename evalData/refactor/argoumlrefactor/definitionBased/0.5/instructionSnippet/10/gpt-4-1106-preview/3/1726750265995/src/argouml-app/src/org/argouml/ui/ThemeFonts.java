package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, String systemAndSmallFontFamily, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for all fonts...
}