package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, largeSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
    }

    // Getters for the fonts
}
