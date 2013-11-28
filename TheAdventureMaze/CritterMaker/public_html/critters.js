/* 
File : critter.js
Project :WaMp assignment - the cabinet
Developer: Ken Jinks
Date: Nov 28 2013
Description: This file contains the code used to draw and animate critters.
 */

//The crittertype defines the physical dimensions of the critter
function CritterType()
{
    this.foreColour     = "#ff0000";
    this.backColour     = "#000000";
    
    this.headHeight     = 80.00;
    this.headAngle      = 0.00;
    
    this.leftArmLength  = 80.00;
    this.leftArmAngle   = 0.00;
    
    this.rightArmLength = 80.00;
    this.rightArmAngle  = 0.00;
    
    this.bodyPosition.x = 400.00;
    this.bodyPosition.y = 400.00;
    this.bodyHeight     = 80.00;
    this.bodyWidth      = 80.00;
    
    this.waistWidth     = 160.00;
    
    this.leftLegLength  = 80.00;
    this.leftLegAngle   = 0.00;
    
    this.rightLegLength = 80.00;
    this.rightLegAngle  = 0.00;
}

function CritterMotionType()
{
    this.headSwingRange = 0.00;
    this.headSwingRate  = 0.00;
    this.headExtendRange = 0.00;
    this.headExtendRate = 0.00;

    this.rightArmSwingRange = 0.00;
    this.rightArmSwingRate  = 0.00;
    this.rightArmExtendRange = 0.00;
    this.rightArmExtendRate = 0.00;

    this.leftArmSwingRange = 0.00;
    this.leftArmSwingRate  = 0.00;
    this.leftArmExtendRange = 0.00;
    this.leftArmExtendRate = 0.00;

    this.rightLegSwingRange = 0.00;
    this.rightLegSwingRate  = 0.00;
    this.rightLegExtendRange = 0.00;
    this.rightLegExtendRate = 0.00;

    this.leftLegSwingRange = 0.00;
    this.leftLegSwingRate  = 0.00;
    this.leftLegExtendRange = 0.00;
    this.leftLegExtendRate = 0.00;
}

function Point()
{
    this.x = 0.00;
    this.y = 0.00;
}

//METHOD         :function DrawCritter_000(context, critterData)               
//DESCRIPTION    :This is the method that draws the geometry of a critter to a 
//given context.        
//PARAMETERS     :                                                           
//         INPUT :context - the graphics context to which is drawn
//               :critterData - the critters parameters as defined in CritterType                                                           
function DrawCritter_000(context, critterData)
{
    var up = Math.PI / 2.0;
    var down = up * 3;
    var left = Math.PI;
    var right = 0.00;
    
    c = new Point();
    c.x = critterData.bodyPosition.x;
    c.y = critterData.bodyPosition.y;
    
    a = new Point();
    a.x = critterData.bodyPosition.x - (critterData.bodyWidth / 2);
    a.y = critterData.bodyPosition.y - (critterData.bodyHeight) + (critterData.headAngle * 20);
    
    b = new Point();
    b.x = critterData.bodyPosition.x + (critterData.bodyWidth / 2);
    b.y = critterData.bodyPosition.y - (critter.bodyHeight) - (critterData.headAngle * 20);
    
    mid_ab = new Point();
    mid_ab = getMidPoint(a, b);
    
    d = new Point();
    d.x = critterData.bodyPosition.x - (critterData.waistWidth / 2);
    d.y = critterData.bodyPosition.y;
    
    e = new Point();
    e.x = critterData.bodyPosition.x + (critterData.waistWidth / 2);
    e.y = critterData.bodyPosition.y;
    
    mid_ad = new Point();
    mid_ad = getMidPoint(a, d);
    
    mid_be = new Point();
    mid_be = getMidPoint(b, e);
    
    mid_dc = new Point();
    mid_dc = getMidPoint(d, c);
    
    mid_ce = new Point();
    mid_ce = getMidPoint(c, e);
    
    j = new Point();
    j.x = mid_ab.x + Math.cos(up + critterData.headAngle) * critterData.headHeight;
    j.y = mid_ab.y + Math.sin(up + critterData.headAngle) * critterData.headHeight;
    
    f = new Point();
    f.x = mid_dc.x + Math.cos(down + critterData.leftLegAngle) * critterData.leftLegLength;
    f.y = mid_dc.y + Math.sin(down + critterData.leftLegAngle) * critterData.leftLegLength;
    
    g = new Point();
    g.x = mid_ce.x + Math.cos(down + critterData.rightLegAngle) * critterData.rightLegLength;
    g.y = mid_ce.y + Math.sin(down + critterData.rightLegAngle) * critterData.rightLegLength;
    
    h = new Point();
    h.x = mid_ad.x + Math.cos(left + critterData.leftArmAngle) * critterData.leftArmLength;
    h.y = mid_ad.y + Math.sin(left + critterData.leftArmAngle) * critterData.leftArmLength;

    i = new Point();
    i.x = mid_be.x + Math.cos(right + critterData.rightArmAngle) * critterData.rightArmLength;
    i.y = mid_be.y + Math.sin(right + critterData.rightArmAngle) * critterData.rightArmLength;
    
    //draw the body
    context.beginPath();
    context.moveTo(j.x, j.y);
    context.lineTo(b.x, b.y);
    context.lineTo(i.x, i.y);
    context.lineTo(e.x, e.y);
    context.lineTo(g.x, g.y);
    context.lineTo(c.x, c.y);
    context.lineTo(f.x, f.y);
    context.lineTo(d.x, d.y);
    context.lineTo(h.x, h.y);
    context.lineTo(a.x, a.y);
    context.closePath();
    context.fillStyle = critterData.foreColour;
    context.strokeStyle = critterData.backColour;
    context.stroke();
    context.fill();
}

function getMidPoint(m, n)
{
    pp = new Point();
    
    pp.x = (m.x + n.x)/2.0;
    pp.y = (m.y + n.y)/2.0;
    
    return pp;
}