package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFace, String systemAndSmallFontFace, int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontFace, Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource(systemAndSmallFontFace, Font.PLAIN, mainFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFace, Font.BOLD, mainFontSize);
        userFont = new FontUIResource(controlAndUserFontFace, Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource(systemAndSmallFontFace, Font.PLAIN, smallFontSize);
    }

    // Additional functionality and getters can be added here
}