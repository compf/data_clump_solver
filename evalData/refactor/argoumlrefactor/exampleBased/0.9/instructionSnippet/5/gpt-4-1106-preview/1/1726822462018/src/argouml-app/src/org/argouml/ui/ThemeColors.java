package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

class ThemeColors {

    ColorUIResource primary1, primary2, primary3;
    ColorUIResource secondary1, secondary2, secondary3;

    ThemeColors() {
        primary1 = new ColorUIResource(102, 102, 153);
        primary2 = new ColorUIResource(153, 153, 204);
        primary3 = new ColorUIResource(204, 204, 255);

        secondary1 = new ColorUIResource(102, 102, 102);
        secondary2 = new ColorUIResource(153, 153, 153);
        secondary3 = new ColorUIResource(204, 204, 204);
    }
}