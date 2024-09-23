package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int controlFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, controlFontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, controlFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // Getters and possibly other methods
}
