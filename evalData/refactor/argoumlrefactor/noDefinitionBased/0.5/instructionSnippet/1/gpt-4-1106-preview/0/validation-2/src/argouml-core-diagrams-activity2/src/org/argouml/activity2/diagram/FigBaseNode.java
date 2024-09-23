package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigGroup;
import org.tigris.gef.presentation.FigNode;

public abstract class FigBaseNode extends FigNode {

    // Existing class content

    @Override
    protected void setBoundsImpl(Rectangle bounds) {
        _x = bounds.x;
        _y = bounds.y;
        _w = bounds.width;
        _h = bounds.height;
        // Other necessary code to update the bounds
    }

    // Rest of the class content
}
