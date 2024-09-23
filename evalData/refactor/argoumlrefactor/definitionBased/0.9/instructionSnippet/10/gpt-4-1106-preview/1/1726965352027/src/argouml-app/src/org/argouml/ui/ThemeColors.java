package org.argouml.ui;

import java.awt.Color;
import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(Color primary1, Color primary2, Color primary3) {
        this.primary1 = new ColorUIResource(primary1);
        this.primary2 = new ColorUIResource(primary2);
        this.primary3 = new ColorUIResource(primary3);
    }

    public ColorUIResource getPrimary1() {
        return primary1;
    }

    public ColorUIResource getPrimary2() {
        return primary2;
    }

    public ColorUIResource getPrimary3() {
        return primary3;
    }
}