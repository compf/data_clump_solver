package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class NodeBounds {

    private int x, y, w, h;

    public NodeBounds(final int x, final int y, final int w, final int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle getBounds() {
        return new Rectangle(x, y, w, h);
    }

    public void updateChildren() {
        // Method to update position of children based on the bounds.
    }

    // Additional methods and functionality can be added here.

}
