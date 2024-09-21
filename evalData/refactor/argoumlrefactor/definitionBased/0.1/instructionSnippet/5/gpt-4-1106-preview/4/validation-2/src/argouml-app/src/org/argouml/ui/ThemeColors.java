package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    public final ColorUIResource primary1;
    public final ColorUIResource primary2;
    public final ColorUIResource primary3;
    public final ColorUIResource secondary1;
    public final ColorUIResource secondary2;
    public final ColorUIResource secondary3;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3, int sr1, int sg1, int sb1, int sr2, int sg2, int sb2, int sr3, int sg3, int sb3) {
        this.primary1 = new ColorUIResource(r1, g1, b1);
        this.primary2 = new ColorUIResource(r2, g2, b2);
        this.primary3 = new ColorUIResource(r3, g3, b3);
        this.secondary1 = new ColorUIResource(sr1, sg1, sb1);
        this.secondary2 = new ColorUIResource(sr2, sg2, sb2);
        this.secondary3 = new ColorUIResource(sr3, sg3, sb3);
    }
}
