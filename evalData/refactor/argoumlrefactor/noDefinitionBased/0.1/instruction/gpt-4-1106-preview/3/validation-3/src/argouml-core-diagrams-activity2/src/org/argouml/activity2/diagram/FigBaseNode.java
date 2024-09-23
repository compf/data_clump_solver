/* $Id$
 *****************************************************************************
 * Copyright (c) 2010-2011 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *****************************************************************************
 */

package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigGroup;
import org.tigris.gef.presentation.FigNode;

/**
 * The Fig for all node diagram elements. All specialist diagram elements
 * decorate this to get specialist behaviour 
 * @author Bob Tarling
 */
class FigBaseNode extends FigNode implements DiagramNode {

    private NodePresentation nodePresentation;

    
    /**
     * Constructor a new FigBaseNode
     * 
     * @param owner the owning UML element
     * @param bounds rectangle describing bounds
     * @param settings rendering settings
     */
    FigBaseNode(final Object owner, final Rectangle bounds,
            final DiagramSettings settings) {
        super(owner);
        setBounds(bounds);
        nodePresentation = new NodePresentation(owner, bounds, settings);
    }
    
    void setDisplayState(FigBasePresentation displayState) {
        this.displayState = displayState;
        nodePresentation.setDisplayState(displayState);
        addFig(nodePresentation.getDisplayState());
    }
    
    @Override
    public boolean isDragConnectable() {
        return false;
    }
    
    
    @Override
    public Dimension getMinimumSize() {
        return nodePresentation.getMinimumSize();
    }
    


// TODO: Move an empty implementation to FigGroup in GEF
    protected void positionChildren() {
        nodePresentation.positionChildren(getBounds());
    }
@Override
    protected void setBoundsImpl(
            final int x,
            final int y,
            final int w,
            final int h) {
        _x = x;
        _y = y;
        _w = w;
        _h = h;
        
        nodePresentation.positionChildren(new Rectangle(x, y, w, h));
/**
     * This is called to rearrange the contents of the Fig when a childs
     * minimum size means it will no longer fit. If this group also has
     * a parent and it will no longer fit that parent then control is
     * delegated to that parent.
     */
    public void calcBounds() {




        }
    }
}




        }
    

    /**
     * This is called to rearrange the contents of the Fig when a child's
     * minimum size means it will no longer fit. If this group also has