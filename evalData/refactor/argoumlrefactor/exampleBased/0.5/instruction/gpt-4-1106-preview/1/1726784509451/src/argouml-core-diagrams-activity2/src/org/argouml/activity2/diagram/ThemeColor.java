package org.argouml.activity2.diagram;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;
    private ColorUIResource secondary1;
    private ColorUIResource secondary2;
    private ColorUIResource secondary3;

    public ThemeColor(int primary1Red, int primary1Green, int primary1Blue,
                      int primary2Red, int primary2Green, int primary2Blue,
                      int primary3Red, int primary3Green, int primary3Blue) {
        this.primary1 = new ColorUIResource(primary1Red, primary1Green, primary1Blue);
        this.primary2 = new ColorUIResource(primary2Red, primary2Green, primary2Blue);
        this.primary3 = new ColorUIResource(primary3Red, primary3Green, primary3Blue);
        this.secondary1 = new ColorUIResource(primary1Red, primary1Green, primary1Blue);
        this.secondary2 = new ColorUIResource(primary2Red, primary2Green, primary2Blue);
        this.secondary3 = new ColorUIResource(primary3Red, primary3Green, primary3Blue);
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

    public ColorUIResource getSecondary1() {
        return secondary1;
    }

    public ColorUIResource getSecondary2() {
        return secondary2;
    }

    public ColorUIResource getSecondary3() {
        return secondary3;
    }
}
