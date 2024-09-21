package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class FigActivationData {

    private Object owner;
    private Rectangle bounds;

    public FigActivationData(Object owner, int x, int y, int width, int height) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, width, height);
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle getRectangle() {
        return bounds;
    }
}