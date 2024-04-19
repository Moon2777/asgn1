function drawing(){
  //let pos = [ 0, 0, 100, 100, 0, 100 ];
  //drawTriangle( [ 0.0, 0.0, 0.5, 0.5, 0.0, 0.5 ] );
  //drawTriangle( normal([ 0, 0, 100, 100, 0, 100 ]) );

  //center, color, radius, degree, segment, x dilation, y dilation
  customCircle([0, 0], [0, 0.85, 0.85, 1], 1, 360, 20, (4*(14.5)), (4*(13.5)), false);
  customCircle([4*(-2.5) , 4*(-2.5) ], [1, 1, 1, 1], 1, 360, 20, (4.5*9.5), (4.5*10), false);

  // fix hairline
  gl.uniform4f(u_FragColor, 0.0, 0.85, 0.85, 1.0);
  let y_d = 74;
  let x_d = -1;
  drawTriangle( convert( [ 4*(-10.5)+x_d, 4*(82-y_d), 5*(4), 5*(86-77), 4*(-6.25)+x_d, 4*(80.5-y_d) ] ) );

  let p1 = [-10, (69.75 - 75)];
  let p2 = [-8.5, (65.35 - 75)];
  let p3 = [-2.6, (61.75 - 75)];
  let p4 = [4.875, (66.5 - 75)];

  // head
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle( convert( [ 5*p2[0], 5*p2[1], 5*p3[0], 5*p3[1], 5*(p4[0] - 0.5), 5*p4[1] ] ) );
  drawTriangle( convert( [ 5*p2[0], 5*p2[1], 5*p3[0], 5*p3[1], 5*p1[0], 5*p1[1] ] ) );

  // ribbons
  y_d = 78.5;
  x_d = 5;
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
  drawTriangle( convert( [ 5*(-11 + x_d), 5*(87.25-y_d), 5*(-13.75 + x_d), 5*(88.25-y_d), 5*(-14.5 + x_d), 5*(84.75-y_d)] ) );
  y_d = 80;
  drawTriangle( convert( [ 5*(11), 5*(92-y_d), 5*(7), 5*(87-y_d), 5*(12.5), 5*(82.75-y_d)] ) );

  // bangs
  gl.uniform4f(u_FragColor, 0.0, 1.0, 1.0, 1.0);
  drawTriangle( convert( [ 5*(5.75), 5*(68-76), 5*(4), 5*(86-77), 5*(-6.25), 5*(80.5-76) ] ) );
  drawTriangle( convert( [ 5*(5.75), 5*(68-76), 5*(4), 5*(86-77), 5*(7), 5*(80.5-76) ] ) );

  y_d = 74;
  x_d = -1;
  //gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
  drawTriangle( convert( [ 4*(-10.5)+x_d, 4*(82-y_d), 4*(-2.75)+x_d, 4*(71-y_d), 4*(-6.25)+x_d, 4*(80.5-y_d) ] ) );
  drawTriangle( convert( [ 4*(-10.5)+x_d, 4*(82-y_d), 4*(-15.75)+x_d, 4*(72-y_d), 5*(-9)+x_d, 5*(60-y_d) ] ) );

  // front ponytails
  y_d = 77;
  x_d = 2;
  drawTriangle( convert( [ 5*((11+12.5)/2 - x_d), 5*(87-y_d), 5*(21 - x_d), 5*(50-y_d), 5*(38 - x_d), 5*(50-y_d)] ) );

  // back ponytails
  x_d = 4;
  drawTriangle( convert( [ 5*(-((11+12.5)/2 - x_d)), 5*(86-y_d), 5*(-(21 - x_d)), 5*(50-y_d), 5*(-(38 - x_d)), 5*(50-y_d)] ) );

  // eyes
  customCircle([3, -18], [0, 0.5, 0.5, 1], 1, 360, 20, 7.5, 15, false);
  customCircle([-40, -18], [0, 0.5, 0.5, 1], 1, 360, 20, 7.5, 15, false);
  //customCircle([0, 0], [0, 0.85, 0.85, 1], 1, 360, 20, (4*(14.5)), (4*(13.5)), false);
}

function convert(x){
  for (let i = 0; i < x.length; i++){
    x[i] = (x[i]/200);
  }
  return x;
}

function customCircle(center, col, rad, deg, seg, x_dil, y_dil, bool ){
    var xy = convert(center);
    var rgba = col;
    var size = rad;
    var segment = seg;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    var d = size/200;

    let angleStep = deg/segment;
    let centerPt = [center[0], center[1]];

    for(var angle = 0; angle < deg; angle = angle+angleStep){
      let angle1 = angle;
      let angle2 = angle+angleStep;
      let vec1 =[(Math.cos(angle1 * Math.PI/180)*d) * (x_dil), (Math.sin(angle1 * Math.PI/180)*d) * (y_dil)];
      let vec2 =[(Math.cos(angle2 * Math.PI/180)*d) * (x_dil), (Math.sin(angle2 * Math.PI/180)*d) * (y_dil)];

      let p1 = [centerPt[0]+vec1[0], centerPt[1]+vec1[1]];
      let p2 = [centerPt[0]+vec2[0], centerPt[1]+vec2[1]];

      if(bool){
        console.log("Point 1: " + p1);
        console.log("Point 2: " + p2);
      }

      drawTriangle([xy[0], xy[1], p1[0], p1[1], p2[0], p2[1]]);
    }
}
