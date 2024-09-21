package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlAndWindowTitleFontFamily, String systemAndUserFontFamily, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndWindowTitleFontFamily, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlAndWindowTitleFontFamily, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemAndUserFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for the font resources can be added here
}
