package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String otherFontName, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        this.systemFont = new FontUIResource(otherFontName, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(otherFontName, Font.PLAIN, smallFontSize);
    }

    // Getters for each font

}