package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int mainFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, mainFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, mainFontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // Getters and other functionality would go here
}
