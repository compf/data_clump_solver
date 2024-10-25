package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFontResources(String controlFamily, String systemFamily, String windowTitleFamily, String userFamily, String smallFamily, int controlSize, int systemSize, int windowTitleSize, int userSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, controlSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, systemSize);
        windowTitleFont = new FontUIResource(windowTitleFamily, Font.BOLD, windowTitleSize);
        userFont = new FontUIResource(userFamily, Font.PLAIN, userSize);
        smallFont = new FontUIResource(smallFamily, Font.PLAIN, smallSize);
    }

    // Getters and possibly other methods omitted for brevity
}
