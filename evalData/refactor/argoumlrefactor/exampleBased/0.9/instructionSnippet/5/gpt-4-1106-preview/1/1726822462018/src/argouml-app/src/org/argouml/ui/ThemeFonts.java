package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

class ThemeFonts {
    FontUIResource controlFont;
    FontUIResource systemFont;
    FontUIResource windowTitleFont;
    FontUIResource userFont;
    FontUIResource smallFont;
    
    ThemeFonts(int fontSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, fontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, fontSize - 2);
    }
}