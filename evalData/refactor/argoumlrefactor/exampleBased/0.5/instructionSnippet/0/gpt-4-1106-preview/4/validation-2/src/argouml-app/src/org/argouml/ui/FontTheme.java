package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class FontTheme {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme(/* parameters for fonts */) {
        // Initialization of fonts
    public FontTheme(FontUIResource controlFont, FontUIResource systemFont, FontUIResource windowTitleFont, FontUIResource userFont, FontUIResource smallFont) {
        this.controlFont = controlFont;
        this.systemFont = systemFont;
        this.windowTitleFont = windowTitleFont;
        this.userFont = userFont;
        this.smallFont = smallFont;
    }
}

    // Getters and potentially other methods
}
