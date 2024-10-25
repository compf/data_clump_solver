package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontSet {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontSet(String controlAndUserFontName, String systemAndSmallFontName, int bigFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontName, Font.PLAIN, bigFontSize);
        systemFont = new FontUIResource(systemAndSmallFontName, Font.PLAIN, bigFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontName, Font.BOLD, bigFontSize);
        userFont = new FontUIResource(controlAndUserFontName, Font.PLAIN, bigFontSize);
        smallFont = new FontUIResource(systemAndSmallFontName, Font.PLAIN, smallFontSize);
    }

    // Additional methods for font manipulation can be added here.
}