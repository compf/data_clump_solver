package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
	private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

	public ThemeFonts(int controlFontStyle, int windowTitleFontStyle, int largeFontSize, int smallFontSize) {
		this.controlFont = new FontUIResource("SansSerif", controlFontStyle, largeFontSize);
		this.systemFont = new FontUIResource("Dialog", Font.PLAIN, largeFontSize);
		this.windowTitleFont = new FontUIResource("SansSerif", windowTitleFontStyle, largeFontSize);
		this.userFont = new FontUIResource("SansSerif", Font.PLAIN, largeFontSize);
		this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
	}
	
	// getters and possibly other methods here
}
