package org.argouml.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, int controlFontStyle, int controlFontSize,
                      String systemFontFamily, int systemFontStyle, int systemFontSize,
                      String windowTitleFontFamily, int windowTitleFontStyle, int windowTitleFontSize,
                      String userFontFamily, int userFontStyle, int userFontSize,
                      String smallFontFamily, int smallFontStyle, int smallFontSize) {
        controlFont = new FontUIResource(controlFontFamily, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontFamily, systemFontStyle, systemFontSize);
        windowTitleFont = new FontUIResource(windowTitleFontFamily, windowTitleFontStyle, windowTitleFontSize);
        userFont = new FontUIResource(userFontFamily, userFontStyle, userFontSize);
        smallFont = new FontUIResource(smallFontFamily, smallFontStyle, smallFontSize);
    }

    // Getter methods for fonts

}
