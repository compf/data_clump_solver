package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFonts(String controlName, String systemName, int controlStyle, int titleStyle, int controlSize, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, controlStyle, controlSize);
        userFont = new FontUIResource(controlName, controlStyle, controlSize);
        windowTitleFont = new FontUIResource(controlName, titleStyle, controlSize);
        smallFont = new FontUIResource(systemName, controlStyle, smallSize);
    }

    // Getters and potentially other methods can be added here
}