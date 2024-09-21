package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int controlSystemSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, controlSystemSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, controlSystemSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, controlSystemSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, controlSystemSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters and setters or other methods can be added here
}
