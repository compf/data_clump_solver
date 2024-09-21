package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public final class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int base, int offset) {
        this.color1 = new ColorUIResource(base, base, base + offset);
        this.color2 = new ColorUIResource(base + offset, base + offset, base + 2 * offset);
        this.color3 = new ColorUIResource(base + 2 * offset, base + 2 * offset, base + 3 * offset);
    }

    // Getter methods for colors can be added here
}