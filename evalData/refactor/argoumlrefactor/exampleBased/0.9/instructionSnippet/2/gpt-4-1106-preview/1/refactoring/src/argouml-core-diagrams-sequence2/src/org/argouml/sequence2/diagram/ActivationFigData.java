package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigData {
    private final Object owner;
    private final Rectangle bounds;

    public ActivationFigData(Object owner, int x, int y, int w, int h) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
    }

    // Getters and possibly other methods omitted for brevity
}
