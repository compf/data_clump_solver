package org.argouml.ui;
package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, regularSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, regularSize);
    }

    // Getters
}
import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    // Constructor and other methods

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
