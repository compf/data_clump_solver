package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int controlAndWindowTitleSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, controlAndWindowTitleSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, controlAndWindowTitleSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, controlAndWindowTitleSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, controlAndWindowTitleSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters for the font resources can be added here
}
