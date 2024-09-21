package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, int controlFontStyle, int controlFontSize, String systemFontName, int systemFontStyle, int systemFontSize, String windowTitleFontName, int windowTitleFontStyle, int windowTitleFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        windowTitleFont = new FontUIResource(windowTitleFontName, windowTitleFontStyle, windowTitleFontSize);
        userFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        smallFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
    }

    // Getters for the fonts
}
