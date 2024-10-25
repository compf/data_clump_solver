package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        this.controlFont = new FontUIResource(control);
        this.systemFont = new FontUIResource(system);
        this.windowTitleFont = new FontUIResource(windowTitle);
        this.userFont = new FontUIResource(user);
        this.smallFont = new FontUIResource(small);
    }
    // Methods for accessing font resources
}
