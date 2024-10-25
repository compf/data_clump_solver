package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFontSet {

	private final FontUIResource controlFont;
	private final FontUIResource systemFont;
	private final FontUIResource windowTitleFont;
	private final FontUIResource userFont;
	private final FontUIResource smallFont;

	public ThemeFontSet(String controlFamily, String systemFamily, int mainSize, int smallSize) {
		controlFont = new FontUIResource(controlFamily, Font.PLAIN, mainSize);
		systemFont = new FontUIResource(systemFamily, Font.PLAIN, mainSize);
		windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, mainSize);
		userFont = new FontUIResource(controlFamily, Font.PLAIN, mainSize);
		smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
	}

	// getters and possibly other methods
}
