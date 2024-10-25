package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFont(Font control, Font system, Font windowTitle, Font user, Font small) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(system);
        windowTitleFont = new FontUIResource(windowTitle);
        userFont = new FontUIResource(user);
        smallFont = new FontUIResource(small);
    }
}