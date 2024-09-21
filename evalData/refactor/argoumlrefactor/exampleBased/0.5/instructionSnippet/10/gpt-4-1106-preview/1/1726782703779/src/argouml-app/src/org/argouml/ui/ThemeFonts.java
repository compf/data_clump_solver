package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int controlSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, controlSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, controlSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, controlSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, controlSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters
}
