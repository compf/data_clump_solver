package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParams {

    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationParams(
        final Object owner, 
        final int x, 
        final int y, 
        final int width, 
        final int height, 
        final DiagramSettings settings, 
        final FigMessage messageFig) {

        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    public Object getOwner() { return owner; }
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public DiagramSettings getSettings() { return settings; }
    public FigMessage getMessageFig() { return messageFig; }
}
