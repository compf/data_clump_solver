package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, largeSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters for all fonts...
}