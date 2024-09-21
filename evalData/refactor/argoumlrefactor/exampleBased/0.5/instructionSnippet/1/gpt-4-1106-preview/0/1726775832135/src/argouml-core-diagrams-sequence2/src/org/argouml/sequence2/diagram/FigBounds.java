package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class FigBounds {
    private final Rectangle bounds;

    public FigBounds(int x, int y, int width, int height) {
        this.bounds = new Rectangle(x, y, width, height);
    }

    public Rectangle getBounds() {
        return bounds;
    }

    public int getX() {
        return bounds.x;
    }

    public int getY() {
        return bounds.y;
    }

    public int getWidth() {
        return bounds.width;
    }

    public int getHeight() {
        return bounds.height;
    }
}