package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {

    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public ActivationDimensions(Object owner, int x, int y, int width, int height) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }
}