package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFace, String systemAndSmallFontFace, int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlAndUserFontFace, Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource(systemAndSmallFontFace, Font.PLAIN, mainFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFace, Font.BOLD, mainFontSize);
        userFont = new FontUIResource(controlAndUserFontFace, Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource(systemAndSmallFontFace, Font.PLAIN, smallFontSize);
    }

    // Additional functionality and getters can be added here
}