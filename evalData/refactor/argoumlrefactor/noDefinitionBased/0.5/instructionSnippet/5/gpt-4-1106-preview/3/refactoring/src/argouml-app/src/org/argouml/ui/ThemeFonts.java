package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String windowTitleFontFamily, String systemFontFamily, String userFontFamily, String smallFontFamily, int controlFontStyle, int windowTitleFontStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, controlFontStyle, largeSize);
        windowTitleFont = new FontUIResource(windowTitleFontFamily, windowTitleFontStyle, largeSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, largeSize);
        userFont = new FontUIResource(userFontFamily, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(smallFontFamily, Font.PLAIN, smallSize);
    }

    // getters and other methods
}
