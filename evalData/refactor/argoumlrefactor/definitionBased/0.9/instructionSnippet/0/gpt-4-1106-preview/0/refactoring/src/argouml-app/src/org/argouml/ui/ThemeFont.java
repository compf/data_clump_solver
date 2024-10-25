package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    public final FontUIResource control;
    public final FontUIResource system;
    public final FontUIResource windowTitle;
    public final FontUIResource user;
    public final FontUIResource small;

    public ThemeFont(String controlFontFamily, int controlFontSize, String systemFontFamily, int systemFontSize, String windowTitleFontFamily, int windowTitleFontSize, String userFontFamily, int userFontSize, String smallFontFamily, int smallFontSize) {
        this.control = new FontUIResource(controlFontFamily, Font.PLAIN, controlFontSize);
        this.system = new FontUIResource(systemFontFamily, Font.PLAIN, systemFontSize);
        this.windowTitle = new FontUIResource(windowTitleFontFamily, Font.BOLD, windowTitleFontSize);
        this.user = new FontUIResource(userFontFamily, Font.PLAIN, userFontSize);
        this.small = new FontUIResource(smallFontFamily, Font.PLAIN, smallFontSize);
    }
}