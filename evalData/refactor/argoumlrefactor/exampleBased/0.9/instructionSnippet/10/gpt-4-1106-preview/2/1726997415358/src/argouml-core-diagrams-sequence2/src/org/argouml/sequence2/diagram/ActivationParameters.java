package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParameters {

    private Object owner;
    private int x;
    private int y;
    private int w;
    private int h;
    private DiagramSettings settings;
    private FigMessage messageFig;

    public ActivationParameters(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // getters and other methods
}