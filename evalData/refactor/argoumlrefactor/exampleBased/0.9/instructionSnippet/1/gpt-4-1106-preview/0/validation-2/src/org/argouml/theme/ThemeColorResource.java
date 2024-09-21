package org.argouml.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColorResource {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    private ColorUIResource secondary1;
    private ColorUIResource secondary2;
    private ColorUIResource secondary3;

    public ThemeColorResource(int primary, int secondary) {
        this.primary1 = new ColorUIResource(primary, primary, primary);
        this.primary2 = new ColorUIResource(primary, primary, primary);
        this.primary3 = new ColorUIResource(primary, primary, primary);

        this.secondary1 = new ColorUIResource(secondary, secondary, secondary);
        this.secondary2 = new ColorUIResource(secondary, secondary, secondary);
        this.secondary3 = new ColorUIResource(secondary, secondary, secondary);
    }

    // Getters and other methods...
}
