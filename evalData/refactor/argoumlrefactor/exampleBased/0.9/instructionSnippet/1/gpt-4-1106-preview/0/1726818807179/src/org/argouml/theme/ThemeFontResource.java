package org.argouml.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResource {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResource(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // Getter methods for each font
}