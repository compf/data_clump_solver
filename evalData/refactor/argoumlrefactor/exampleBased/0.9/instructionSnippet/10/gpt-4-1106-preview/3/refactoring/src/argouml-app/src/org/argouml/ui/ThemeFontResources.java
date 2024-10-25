package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResources(String controlName, String systemName, int controlStyle, int controlSize, int titleStyle, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, controlStyle, controlSize);
        windowTitleFont = new FontUIResource(controlName, titleStyle, controlSize);
        userFont = new FontUIResource(controlName, controlStyle, controlSize);
        smallFont = new FontUIResource(systemName, controlStyle, smallSize);
    }

    // Getters for FontUIResource fields
    // ...
}