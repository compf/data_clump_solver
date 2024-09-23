package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.metal.MetalTheme;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private MetalTheme theme;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize, MetalTheme theme) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
        this.theme = theme;
    }

    // Getters for fonts
    // Additional methods using theme
}