package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, largeSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, largeSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, largeSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
    }

    // Accessor methods for the fonts
    // ...
}