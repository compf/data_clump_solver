package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationData {
    private final Object owner;
    private final Rectangle bounds;

    public ActivationData(Object owner, int x, int y, int w, int h) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle getBounds() {
        return bounds;
    }
}