
package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

class ThemeFonts {
    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        this.controlFont = new FontUIResource(control);
        this.systemFont = new FontUIResource(system);
        this.windowTitleFont = new FontUIResource(windowTitle);
        this.userFont = new FontUIResource(user);
        this.smallFont = new FontUIResource(small);
    }

    // Getters and possibly other methods related to font management
}
