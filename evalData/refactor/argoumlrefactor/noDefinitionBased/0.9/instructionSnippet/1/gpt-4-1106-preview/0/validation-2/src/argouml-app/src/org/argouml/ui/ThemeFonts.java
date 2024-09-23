package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    //... existing content ...

    // Fields for font values
    private FontUIResource controlFont = new FontUIResource("SansSerif", Font.PLAIN, 12);
    private FontUIResource systemFont = new FontUIResource("Dialog", Font.PLAIN, 12);
    private FontUIResource userFont = new FontUIResource("SansSerif", Font.PLAIN, 12);
    private FontUIResource smallFont = new FontUIResource("Dialog", Font.PLAIN, 10);
    private FontUIResource windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 12);

    // Constructors should have an empty body or valid implementation
    public ThemeFonts() {
        // Implement constructor logic if necessary
    }

    // Getters should return actual fields
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}