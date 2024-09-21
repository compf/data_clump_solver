package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int controlFontStyle, int systemFontStyle, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, fontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontName, controlFontStyle, fontSize);
        smallFont = new FontUIResource(systemFontName, systemFontStyle, smallFontSize);
    }

    // Getters for individual fonts...
}