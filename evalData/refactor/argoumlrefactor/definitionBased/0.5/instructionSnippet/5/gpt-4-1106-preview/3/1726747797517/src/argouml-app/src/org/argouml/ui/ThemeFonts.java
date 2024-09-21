package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    public final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFamily, String otherFamily, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        systemFont = new FontUIResource(otherFamily, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, largeSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(otherFamily, Font.PLAIN, smallSize);
    }
}
