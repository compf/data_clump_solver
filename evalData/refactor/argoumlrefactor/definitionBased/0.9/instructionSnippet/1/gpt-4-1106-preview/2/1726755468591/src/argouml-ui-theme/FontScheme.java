package org.argouml.ui.theme;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class FontScheme {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontScheme(String controlAndUserFontFamily, String systemAndSmallFontFamily, int regularFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, regularFontSize);
        systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, regularFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, regularFontSize);
        userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, regularFontSize);
        smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for FontUIResources...
}
