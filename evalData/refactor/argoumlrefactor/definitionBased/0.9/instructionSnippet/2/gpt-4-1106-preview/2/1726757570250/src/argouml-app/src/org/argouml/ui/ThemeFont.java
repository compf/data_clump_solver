package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(String controlAndUserFontName, String systemAndSmallFontName, int normalSize, int smallSize) {
        controlFont = new FontUIResource(controlAndUserFontName, Font.PLAIN, normalSize);
        systemFont = new FontUIResource(systemAndSmallFontName, Font.PLAIN, normalSize);
        windowTitleFont = new FontUIResource(controlAndUserFontName, Font.BOLD, normalSize);
        userFont = new FontUIResource(controlAndUserFontName, Font.PLAIN, normalSize);
        smallFont = new FontUIResource(systemAndSmallFontName, Font.PLAIN, smallSize);
    }

    // Getters for the fonts...
}
