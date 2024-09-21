package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int regularSize, int smallSize) {
        this(controlFontFamily, systemFontFamily, regularSize, smallSize, Font.PLAIN);
    }

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int regularSize, int smallSize, int titleFontStyle) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlFontFamily, titleFontStyle, regularSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
    }

    // Additional functionality or accessors can be added here
}
