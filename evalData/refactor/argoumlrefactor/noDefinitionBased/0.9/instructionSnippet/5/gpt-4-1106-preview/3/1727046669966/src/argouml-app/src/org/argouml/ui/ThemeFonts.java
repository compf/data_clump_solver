package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

class ThemeFonts {
    FontUIResource controlFont;
    FontUIResource systemFont;
    FontUIResource windowTitleFont;
    FontUIResource userFont;
    FontUIResource smallFont;

    ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }
}
