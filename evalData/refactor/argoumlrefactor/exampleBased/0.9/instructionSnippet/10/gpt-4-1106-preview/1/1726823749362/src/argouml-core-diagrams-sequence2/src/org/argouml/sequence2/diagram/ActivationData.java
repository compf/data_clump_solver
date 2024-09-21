package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigMessage;

public class ActivationData {
    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final FigMessage messageFig;

    public ActivationData(Object owner, int x, int y, int width, int height, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.messageFig = messageFig;
    }

    public Object getOwner() { return owner; }
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public FigMessage getMessageFig() { return messageFig; }
}
