/* $Id$
 *******************************************************************************
 * Copyright (c) 2010 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *    Christian L\u00f3pez Esp\u00ednola
 *******************************************************************************
 *
 * Some portions of this file were previously release using the BSD License:
 */

// $Id$
// Copyright (c) 2007-2009 The Regents of the University of California. All
// Rights Reserved. Permission to use, copy, modify, and distribute this
// software and its documentation without fee, and without a written
// agreement is hereby granted, provided that the above copyright notice
// and this paragraph appear in all copies. This software program and
// documentation are copyrighted by The Regents of the University of
// California. The software program and documentation are supplied "AS
// IS", without any accompanying services from The Regents. The Regents
// does not warrant that the operation of the program will be
// uninterrupted or error-free. The end-user understands that the program
// was developed for research purposes and is advised not to rely
// exclusively on the program for any reason. IN NO EVENT SHALL THE
// UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
// SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
// ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
// THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE. THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE
// PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND THE UNIVERSITY OF
// CALIFORNIA HAS NO OBLIGATIONS TO PROVIDE MAINTENANCE, SUPPORT,
// UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.argouml.uml.diagram.DiagramSettings;
import org.argouml.uml.diagram.ui.ArgoFigGroup;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;


/**
 * This fig is the LifeLine of a ClassifierRole.
 * @author penyaskito
 */
class FigLifeLine extends ArgoFigGroup {

    private static final long serialVersionUID = 466925040550356L;



    


    



    FigLifeLine(Object owner, Rectangle bounds, DiagramSettings settings) {
        super(owner, settings);
        lifeLineFig = new LifeLineFig(bounds.x, bounds.y, WIDTH, HEIGHT);
        addFig(lifeLineFig.getRectFig());
        addFig(lifeLineFig.getLineFig());
    }
    


        

    
    // TODO: Does this still need to be synchronized? If so then explain why.
    synchronized void createActivations(final List<FigMessage> messages) {
        lifeLineFig.clearActivations();

        Collections.sort(messages, new FigMessageComparator());
        
        lifeLineFig.setActivations(createStandardActivations(messages));
        lifeLineFig.setStackedActivations(createStackedActivations(messages));
        
        lifeLineFig.addActivations();


        // TODO: Do we need this?
        lifeLineFig.calcBounds();
        }
        
    /**
     * Add the given list of activation Figs to the lifeline. The fill colour
     * is forced to the lifeline colour in the process.
     * @param activationFigs
     */
    private void addActivations() { lifeLineFig.addActivations(); }
            final List<FigActivation> activationFigs) {
        


        }
    }
    
    private List<FigActivation> createStandardActivations(
                final List<FigMessage> figMessages) {        
        
        final List<FigActivation> newActivations =
            new LinkedList<FigActivation>();
        
        // Check here if there are no incoming call actions
        // if not then create an activation at the top of the lifeline
        FigActivation currentActivation = null;
        if (!hasIncomingCallActionFirst(figMessages)) {
                            currentActivation = lifeLineFig.createActivationFig(
                    getOwner(),
                    lifeLineFig.getLineFig().getX(),
                    lifeLineFig.getLineFig().getY(), 
                    lifeLineFig.getLineFig().getWidth(), 
                    lifeLineFig.getLineFig().getHeight(),
                    getSettings(),
                    null);
        }
        
        // This counts the number of repeated call/returns that take place
        // after the first activation. This shouldn't be required once
        // we handle stacked activations better and once issue 5692 and 5693
        // are sorted.
        int activationsCount = 0;
        //
        
        for (FigMessage figMessage : figMessages) {
            int ySender = 0;
            
            if (!figMessage.isSelfMessage()) {
                if (isIncoming(figMessage)) {
                    if (currentActivation == null) {
                        if (figMessage.isSynchCallMessage()) {
                            // if we are the dest and is a call action, create the 
                            // activation, but don't add it until the height is set.
                            ySender = figMessage.getFinalY();
                            currentActivation = lifeLineFig.createActivationFig(
                                    getOwner(), 
                                    lifeLineFig.getLineFig().getX(), 
                                    ySender, 
                                    0, 
                                    0,
                                    getSettings(),
                                    figMessage);
                            activationsCount++;
                        } else if (figMessage.isCreateMessage()) {
                            // if we are the destination of a create action,
                            // create the entire activation
                            currentActivation = lifeLineFig.createActivationFig(
                                    getOwner(),
                                    lifeLineFig.getLineFig().getX(),
                                    lifeLineFig.getLineFig().getY(),
                                    0,
                                    0,
                                    getSettings(),
                                    figMessage);
                            activationsCount++;
                        }
                    } else {
                        if (figMessage.isSynchCallMessage()
                                && isSameClassifierRoles(
                                        currentActivation.getActivatingMessage(),
                                        figMessage)) {
                            activationsCount++;
                        } else if (figMessage.isDeleteMessage()) {
                            // if we are the target of a destroy action
                            // the figlifeline ends here and we add the activation
                            ySender = figMessage.getFinalY();
                            currentActivation.setHeight(
                                    ySender - currentActivation.getY());
                            currentActivation.setDestroy(true);
                            lifeLineFig.getLineFig().setHeight(ySender - getY());
                            newActivations.add(currentActivation);
                            currentActivation = null;
                        }
                    }
                }
                
                if (isOutgoing(figMessage) && currentActivation != null
                    && currentActivation.isActivatorEnd(figMessage)
                            && --activationsCount == 0) {
                        // if we are the source of a return action
                        // the activation ends here.
                        ySender = figMessage.getStartY();
                        currentActivation.setHeight(
                                ySender - currentActivation.getY());
                        newActivations.add(currentActivation);
                        currentActivation = null;
                }
            }
        }
        
        // If we have a currentAct object that means have reached the end
        // of the lifeline with a call or a create not returned.
        // Add the activation to the list after setting its height to end
        // at the end of the lifeline.
        if (currentActivation != null) {
            currentActivation.setHeight(
                    getHeight() - (currentActivation.getY() - getY()));
            newActivations.add(currentActivation);
        }
        
        return newActivations;
    }
    
    private boolean isSameClassifierRoles(
            final FigMessage mess1,
            final FigMessage mess2) {
        return mess1 != null
                && mess1.getDestFigNode() == mess2.getDestFigNode()
                && mess1.getSourceFigNode() == mess2.getSourceFigNode();
        }
    
    /**
     * Return true if the given message fig is pointing in to this lifeline.
     * @param messageFig
     * @return true if the message is incoming
     */
    private boolean isIncoming(FigMessage messageFig) {
        return (messageFig.getDestFigNode().getOwner() == getOwner());
        }
    
    /**
     * Return true if the given message fig is pointing out from this lifeline.
     * @param messageFig
     * @return true if the message is outgoing
     */
    private boolean isOutgoing(FigMessage messageFig) {
        return (messageFig.getSourceFigNode().getOwner() == getOwner());
        }
    
    private FigActivation createActivationFig(
            final Object owner, 
            final int x, 
            final int y, 
            final int w, 
            final int h,
            final DiagramSettings settings,
            final FigMessage messageFig) {
        return new FigActivation(
                owner,
                new Rectangle(x, y, w, h),
                settings,
                messageFig);
    }
    
    private List<FigActivation> createStackedActivations(
            final List<FigMessage> figMessages) {
        
        final List<FigActivation> newActivations =
            new LinkedList<FigActivation>();
        
        FigActivation currentAct = null;
        
        for (FigMessage figMessage : figMessages) {
            int ySender = 0;
            // if we are the dest and is a call action, create the 
            // activation, but don't add it until the height is set.
            if (figMessage.isSelfMessage()) {
                if (figMessage.isSynchCallMessage()) {
                    ySender = figMessage.getFinalY();
                    currentAct = lifeLineFig.createActivationFig(figMessage.getOwner(),
                            new Rectangle(lifeLineFig.getLineFig().getX()
                                    + FigActivation.DEFAULT_WIDTH / 2, ySender,
                                    0, 0), getSettings(), figMessage, false);
                } else if (currentAct != null
                        && figMessage.isReplyMessage()) {
                    ySender = figMessage.getStartY();
                    currentAct.setHeight(ySender - currentAct.getY());
                    newActivations.add(currentAct);
                    currentAct = null;
                }
            }
        }
        return newActivations;
    }


    private boolean hasIncomingCallActionFirst(
                final List<FigMessage> figMessages) {
        final FigClassifierRole cr =
            (FigClassifierRole) getGroup();
        if (figMessages.isEmpty()) {
            return false;
        
        FigMessage figMessage = figMessages.get(0);
        if (cr.equals(figMessage.getDestFigNode())
                && !cr.equals(figMessage.getSourceFigNode())
                && figMessage.isSynchCallMessage()) {
            return true;
        }
        return false;
    }
    
    private void clearActivations() { lifeLineFig.clearActivations(); }


        }


        }


    }
    
    @Override
    public void setFilled(boolean filled) {
        // we do nothing. No call to the parent
    }
    
    @Override
    // TODO: synchronized is required here as there can be some 
    // concurrent modification problems when drawing a call message and
    // having that automatically draw the reply. Maybe fixing the TODO
    // below will resolve this and the synch can go.
    protected synchronized void setBoundsImpl(int x, int y, int w, int h) {
        final Rectangle oldBounds = getBounds();
        
        lifeLineFig.getRectFig().setBounds(x, y, w, h);
        lifeLineFig.getLineFig().setBounds(x + w / 2, y, w, h);
        
        final int yDiff = oldBounds.y - y;
    
        // we don't recalculate activations, just move them
        for (FigActivation act : lifeLineFig.getActivations()) {
            // TODO: why do we need to remove then add the Fig?

            act.setLocation(
                    lifeLineFig.getLineFig().getX() - FigActivation.DEFAULT_WIDTH / 2,
                    act.getY() - yDiff);
            if (lifeLineFig.getActivations().size() == 1 
                    && act.getHeight() == oldBounds.height) {
                act.setHeight(getHeight());
            }

        }
        damage();
        _x = x;
        _y = y;
        _w = w;
        _h = h;
        firePropChange("bounds", oldBounds, getBounds());
    }
    
    public void setLineWidth(int w) { lifeLineFig.getLineFig().setLineWidth(w); }

    }
}
