/* --------------------------------------------------------------------------
 * SimpleOpenNI DepthImage Test
 * --------------------------------------------------------------------------
 * Processing Wrapper for the OpenNI/Kinect 2 library
 * http://code.google.com/p/simple-openni
 * --------------------------------------------------------------------------
 * prog:  Max Rheiner / Interaction Design / Zhdk / http://iad.zhdk.ch/
 * date:  12/12/2012 (m/d/y)
 * ----------------------------------------------------------------------------
 */

import SimpleOpenNI.*;
import com.hamoid.*;


SimpleOpenNI  context;
VideoExport videoExport;

void setup()
{
  size(1290, 480);
  context = new SimpleOpenNI(this);
  if (context.isInit() == false)
  {
    println("Can't init SimpleOpenNI, maybe the camera is not connected!");
    exit();
    return;
  }

  // mirror is by default enabled
  context.setMirror(true);

  // enable depthMap generation
  context.enableDepth();

  // enable ir generation
  context.enableRGB();

  context.alternativeViewPointDepthToImage();

  videoExport = new VideoExport(this, "myVideo.mp4");
videoExport.setFrameRate(30);
videoExport.startMovie();
}

void draw()
{

 videoExport.saveFrame();

  // update the cam
  context.update();

  background(200, 0, 0);

  // draw depthImageMap
  image(context.depthImage(), 0, 0);

  // draw irImageMap
  image(context.rgbImage(), context.depthWidth() + 10, 0);
}

void keyPressed() {
  if (key == 'q') {
    videoExport.endMovie();
    exit();
  }
  }
