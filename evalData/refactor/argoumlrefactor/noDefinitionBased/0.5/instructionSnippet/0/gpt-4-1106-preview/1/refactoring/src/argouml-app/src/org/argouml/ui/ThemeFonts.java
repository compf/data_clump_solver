package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource control;
    private final FontUIResource system;
    private final FontUIResource windowTitle;
    private final FontUIResource user;
    private final FontUIResource small;

    public ThemeFonts(Font controlFont, Font systemFont, Font windowTitleFont, Font userFont, Font smallFont) {
        control = new FontUIResource(controlFont);
        system = new FontUIResource(systemFont);
        windowTitle = new FontUIResource(windowTitleFont);
        user = new FontUIResource(userFont);
        small = new FontUIResource(smallFont);
    }

    // Additional functionality and getters can be added here
}
