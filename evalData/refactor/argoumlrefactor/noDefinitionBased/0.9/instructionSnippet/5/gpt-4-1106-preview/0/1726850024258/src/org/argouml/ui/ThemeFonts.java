package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(system);
        windowTitleFont = new FontUIResource(windowTitle);
        userFont = new FontUIResource(user);
        smallFont = new FontUIResource(small);
    }

    // Getter methods for fonts...
}
