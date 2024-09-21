package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

	private FontUIResource controlFont;
	private FontUIResource systemFont;
	private FontUIResource windowTitleFont;
	private FontUIResource userFont;
	private FontUIResource smallFont;

	public ThemeFonts(String fontType, int textStyle, int fontSize) {
		this.controlFont = new FontUIResource(fontType, textStyle, fontSize);
		this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
		this.windowTitleFont = new FontUIResource(fontType, Font.BOLD, fontSize);
		this.userFont = new FontUIResource(fontType, Font.PLAIN, fontSize);
		this.smallFont = new FontUIResource("Dialog", Font.PLAIN, fontSize - 2);
	}

	public FontUIResource getControlFont() {
		return controlFont;
	}

	public FontUIResource getSystemFont() {
		return systemFont;
	}

	public FontUIResource getWindowTitleFont() {
		return windowTitleFont;
	}

	public FontUIResource getUserFont() {
		return userFont;
	}

	public FontUIResource getSmallFont() {
		return smallFont;
	}
}