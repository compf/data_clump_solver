package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource control;
    private final FontUIResource system;
    private final FontUIResource windowTitle;
    private final FontUIResource user;
    private final FontUIResource small;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        this.control = new FontUIResource(control);
        this.system = new FontUIResource(system);
        this.windowTitle = new FontUIResource(windowTitle);
        this.user = new FontUIResource(user);
        this.small = new FontUIResource(small);
    }

    public FontUIResource getControlFont() {
        return control;
    }

    public FontUIResource getSystemFont() {
        return system;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitle;
    }

    public FontUIResource getUserFont() {
        return user;
    }

    public FontUIResource getSmallFont() {
        return small;
    }
}
