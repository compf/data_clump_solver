package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, String systemAndSmallFontFamily, int largeFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, largeFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, largeFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, largeFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
    }

    // Getters for all font resources...
}