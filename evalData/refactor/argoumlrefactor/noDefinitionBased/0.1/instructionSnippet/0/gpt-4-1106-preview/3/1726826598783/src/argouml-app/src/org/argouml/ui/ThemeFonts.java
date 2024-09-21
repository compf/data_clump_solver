package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        this.controlFont = new FontUIResource(control);
        this.systemFont = new FontUIResource(system);
        this.windowTitleFont = new FontUIResource(windowTitle);
        this.userFont = new FontUIResource(user);
        this.smallFont = new FontUIResource(small);
    }

    // Getters and potentially other methods
}
