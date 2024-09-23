package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    ThemeFonts() {
        this("SansSerif", "Dialog", Font.PLAIN, 14, 12);
    }

    ThemeFonts(String controlFontName, String systemFontName, int fontStyle, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, fontStyle, largeFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlFontName, fontStyle, largeFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    FontUIResource getControlFont() {
        return controlFont;
    }

    FontUIResource getSystemFont() {
        return systemFont;
    }

    FontUIResource getUserFont() {
        return userFont;
    }

    FontUIResource getSmallFont() {
        return smallFont;
    }

    FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}