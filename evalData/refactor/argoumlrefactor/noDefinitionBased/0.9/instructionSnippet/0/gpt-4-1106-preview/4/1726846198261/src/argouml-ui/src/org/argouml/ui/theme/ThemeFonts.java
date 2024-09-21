package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlName, int controlStyle, int controlSize, String systemName, int systemStyle, int systemSize, String windowName, int windowStyle, int windowSize, String userName, int userStyle, int userSize, String smallName, int smallStyle, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, systemStyle, systemSize);
        windowTitleFont = new FontUIResource(windowName, windowStyle, windowSize);
        userFont = new FontUIResource(userName, userStyle, userSize);
        smallFont = new FontUIResource(smallName, smallStyle, smallSize);
    }

    // getters for the fonts...
}
