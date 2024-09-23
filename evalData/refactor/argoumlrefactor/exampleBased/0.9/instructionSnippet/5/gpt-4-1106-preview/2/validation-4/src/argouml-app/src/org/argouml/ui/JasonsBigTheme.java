/* $Id$
 *****************************************************************************
 * Copyright (c) 2009 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    tfmorris
 *****************************************************************************
 *
 * Some portions of this file was previously release using the BSD License:
 */

// Copyright (c) 1996-2006 The Regents of the University of California. All
// Rights Reserved. Permission to use, copy, modify, and distribute this
// software and its documentation without fee, and without a written
// agreement is hereby granted, provided that the above copyright notice
// and this paragraph appear in all copies.  This software program and
// documentation are copyrighted by The Regents of the University of
// California. The software program and documentation are supplied "AS
// IS", without any accompanying services from The Regents. The Regents
// does not warrant that the operation of the program will be
// uninterrupted or error-free. The end-user understands that the program
// was developed for research purposes and is advised not to rely
// exclusively on the program for any reason.  IN NO EVENT SHALL THE
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
public class JasonsBigTheme extends MetalTheme {

    private final ThemeColors primaryColors = new ThemeColors(102, 153);
    private final ThemeColors secondaryColors = new ThemeColors(102, 153);
    private final ThemeFonts themeFonts = new ThemeFonts("SansSerif", "Dialog", Font.PLAIN, Font.BOLD, 14, 12);

    @Override
    public String getName() { return "Large Fonts"; }

    @Override
    protected ColorUIResource getPrimary1() { return primaryColors.getPrimary1(); }

    @Override
    protected ColorUIResource getPrimary2() { return primaryColors.getPrimary2(); }

    @Override
    protected ColorUIResource getPrimary3() { return primaryColors.getPrimary3(); }

    @Override
    protected ColorUIResource getSecondary1() { return secondaryColors.getSecondary1(); }

    @Override
    protected ColorUIResource getSecondary2() { return secondaryColors.getSecondary2(); }

    @Override
    protected ColorUIResource getSecondary3() { return secondaryColors.getSecondary3(); }

    @Override
    public FontUIResource getControlTextFont() { return themeFonts.getControlFont(); }

    @Override
    public FontUIResource getSystemTextFont() { return themeFonts.getSystemFont(); }

    @Override
    public FontUIResource getUserTextFont() { return themeFonts.getUserFont(); }

    @Override
    public FontUIResource getMenuTextFont() { return themeFonts.getMenuFont(); }

    @Override
    public FontUIResource getSubTextFont() { return themeFonts.getSubFont(); }

    @Override
    public FontUIResource getWindowTitleFont() { return themeFonts.getWindowTitleFont(); }
