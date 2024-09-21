package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {

    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public FontTheme(String controlFamily, String systemFamily, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, largeSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters and potentially other methods can be added here
}
