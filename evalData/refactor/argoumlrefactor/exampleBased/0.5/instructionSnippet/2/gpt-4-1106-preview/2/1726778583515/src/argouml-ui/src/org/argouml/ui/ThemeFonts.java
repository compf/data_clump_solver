package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int controlFontStyle, int windowTitleFontStyle, int commonFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, commonFontSize);
        systemFont = new FontUIResource(systemFontName, controlFontStyle, commonFontSize);
        windowTitleFont = new FontUIResource(controlFontName, windowTitleFontStyle, commonFontSize);
        userFont = new FontUIResource(controlFontName, controlFontStyle, commonFontSize);
        smallFont = new FontUIResource(systemFontName, controlFontStyle, smallFontSize);
    }

    // Getters for the font resources
}
