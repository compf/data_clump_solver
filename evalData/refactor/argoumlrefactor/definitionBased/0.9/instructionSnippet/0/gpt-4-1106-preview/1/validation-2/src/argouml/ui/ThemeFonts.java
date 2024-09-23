package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    public FontUIResource getControlFont() {
        return new FontUIResource("Dialog", Font.BOLD, 12);
    }

    public FontUIResource getSystemFont() {
        return new FontUIResource("Dialog", Font.PLAIN, 12);
    }

    public FontUIResource getWindowTitleFont() {
        return new FontUIResource("Dialog", Font.BOLD, 12);
    }

    public FontUIResource getUserFont() {
        return new FontUIResource("Dialog", Font.PLAIN, 12);
    }

    public FontUIResource getSmallFont() {
        return new FontUIResource("Dialog", Font.PLAIN, 10);
    }
}
