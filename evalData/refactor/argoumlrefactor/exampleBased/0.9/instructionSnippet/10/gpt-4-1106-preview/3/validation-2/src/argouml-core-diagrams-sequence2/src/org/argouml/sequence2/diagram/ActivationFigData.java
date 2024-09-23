package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.Fig;

public class ActivationFigData {
    private Object owner;
    private int x;
    private int y;
    private int width;
    private int height;
    private DiagramSettings settings;
    private FigMessage messageFig;

    public ActivationFigData(Object owner, int x, int y, int width, int height, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
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
        return settings;
    }

    public FigMessage getFigMessage() {
        return messageFig;
    }

    // Other methods
}