package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for the fonts
    // ...
}