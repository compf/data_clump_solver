package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primary, int secondary, int tertiary) {
        this.primary1 = new ColorUIResource(primary, primary, tertiary);
        this.primary2 = new ColorUIResource(secondary, secondary, tertiary + 51);
        this.primary3 = new ColorUIResource(tertiary, tertiary, tertiary + 102);
        this.secondary1 = new ColorUIResource(primary, primary, primary);
        this.secondary2 = new ColorUIResource(secondary, secondary, secondary);
        this.secondary3 = new ColorUIResource(tertiary, tertiary, tertiary);
    }

    // Getters for the colors
    public ColorUIResource primary1() { return primary1; }
    public ColorUIResource primary2() { return primary2; }
    public ColorUIResource primary3() { return primary3; }
    public ColorUIResource secondary1() { return secondary1; }
    public ColorUIResource secondary2() { return secondary2; }
    public ColorUIResource secondary3() { return secondary3; }
}
