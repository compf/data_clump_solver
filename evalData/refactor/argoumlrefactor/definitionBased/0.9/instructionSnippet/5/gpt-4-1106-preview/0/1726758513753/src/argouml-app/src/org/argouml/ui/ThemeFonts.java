package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String control, String system, int size, int smallSize) {
        controlFont = new FontUIResource(control, Font.PLAIN, size);
        systemFont = new FontUIResource(system, Font.PLAIN, size);
        windowTitleFont = new FontUIResource(control, Font.BOLD, size);
        userFont = new FontUIResource(control, Font.PLAIN, size);
        smallFont = new FontUIResource(system, Font.PLAIN, smallSize);
    }

    // getters for font attributes
}