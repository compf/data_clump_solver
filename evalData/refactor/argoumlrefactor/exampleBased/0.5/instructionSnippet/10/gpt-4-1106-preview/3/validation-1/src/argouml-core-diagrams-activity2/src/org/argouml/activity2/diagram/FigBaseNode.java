package org.argouml.activity2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigNode;

public abstract class FigBaseNode extends FigNode {

    // Abstract method to be implemented by subclasses
    protected abstract void setDisplayState(Object displayState);

    // Other members and methods...

    // Corrected method signature
    @Override
    protected void setBoundsImpl(Rectangle bounds) {
        _x = bounds.x;
        _y = bounds.y;
        _w = bounds.width;
        _h = bounds.height;
        // Call to positionChildren here if necessary
    }

    // Other methods...
}