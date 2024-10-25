package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResources(String controlAndUserFontFamily, String systemAndSmallFontFamily, int normalSize, int smallSize) {
        controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, normalSize);
        systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, normalSize);
        windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, normalSize);
        userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, normalSize);
        smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallSize);
    }

    // Getters for all fonts...
}
