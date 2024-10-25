package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    final FontUIResource controlFont;
    final FontUIResource systemFont;
    final FontUIResource windowTitleFont;
    final FontUIResource userFont;
    final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int style, int size, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, style, size);
        this.systemFont = new FontUIResource(systemFontName, style, size);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, size);
        this.userFont = new FontUIResource(controlFontName, style, size);
        this.smallFont = new FontUIResource(systemFontName, style, smallSize);
    }
}