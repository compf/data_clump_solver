package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int size, int userStyle, int titleStyle, int smallSize) {
        controlFont = new FontUIResource(controlFamily, userStyle, size);
        systemFont = new FontUIResource(systemFamily, userStyle, size);
        windowTitleFont = new FontUIResource(controlFamily, titleStyle, size);
        userFont = new FontUIResource(controlFamily, userStyle, size);
        smallFont = new FontUIResource(systemFamily, userStyle, smallSize);
    }

    // Getters and other methods...
}