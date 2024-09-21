package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {

    public static final FontUIResource CONTROL_FONT = new FontUIResource("SansSerif", Font.PLAIN, 14);
    public static final FontUIResource SYSTEM_FONT = new FontUIResource("Dialog", Font.PLAIN, 14);
    public static final FontUIResource WINDOW_TITLE_FONT = new FontUIResource("SansSerif", Font.BOLD, 14);
    public static final FontUIResource USER_FONT = new FontUIResource("SansSerif", Font.PLAIN, 14);
    public static final FontUIResource SMALL_FONT = new FontUIResource("Dialog", Font.PLAIN, 12);

    private FontTheme() {
        // Utility class
    }
}
