package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int regularSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, regularSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, regularSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, regularSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, regularSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
    }

    // getters and other functionality
}
