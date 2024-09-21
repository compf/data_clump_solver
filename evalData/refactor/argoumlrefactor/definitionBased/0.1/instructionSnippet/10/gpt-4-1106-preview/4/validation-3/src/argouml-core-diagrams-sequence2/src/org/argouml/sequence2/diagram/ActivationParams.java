package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParams {

    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings diagramSettings;

    public ActivationParams(Object owner, int x, int y, int width, int height, DiagramSettings diagramSettings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.diagramSettings = diagramSettings;
    }

    public Object getOwner() {
        return owner;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public DiagramSettings getDiagramSettings() {
        return diagramSettings;
    }
}