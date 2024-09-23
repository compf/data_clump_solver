package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    public static final FontUIResource CONTROL_FONT = new FontUIResource("SansSerif", Font.BOLD, 14);
    public static final FontUIResource SYSTEM_FONT = new FontUIResource("Dialog", Font.PLAIN, 14);
    public static final FontUIResource WINDOW_TITLE_FONT = new FontUIResource("SansSerif", Font.BOLD, 14);
    public static final FontUIResource USER_FONT = new FontUIResource("SansSerif", Font.PLAIN, 14);
    public static final FontUIResource SMALL_FONT = new FontUIResource("Dialog", Font.PLAIN, 12);

    public ThemeFont(int size) {
        // Constructors that accept a size parameter to increase flexibility
    }

    public ThemeFont() {
        // Default constructor for standard theme font sizes
    }
}