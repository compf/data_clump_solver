package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, int controlStyle, int controlSize, String systemFontName, int systemStyle, int systemSize, String titleFontName, int titleStyle, int titleSize, String userFontName, int userStyle, int userSize, String smallFontName, int smallStyle, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, controlStyle, controlSize);
        this.systemFont = new FontUIResource(systemFontName, systemStyle, systemSize);
        this.windowTitleFont = new FontUIResource(titleFontName, titleStyle, titleSize);
        this.userFont = new FontUIResource(userFontName, userStyle, userSize);
        this.smallFont = new FontUIResource(smallFontName, smallStyle, smallSize);
    }

    // Getters for each font
}
