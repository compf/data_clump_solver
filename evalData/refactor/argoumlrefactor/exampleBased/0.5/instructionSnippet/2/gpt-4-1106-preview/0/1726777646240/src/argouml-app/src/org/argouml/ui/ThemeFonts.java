package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int size, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, size);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, size);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, size);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, size);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters and other methods if necessary
}