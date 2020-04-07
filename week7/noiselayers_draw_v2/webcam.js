
// List cameras and microphones.

//function getcameras() {

  // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  //    console.log("enumerateDevices() not supported.");
  //    return;
  //  }

   // List cameras and microphones.
let cameras = [];
   navigator.mediaDevices.enumerateDevices()
     .then(function(devices) {
       devices.forEach(function(device) {
         if (device.kind == "videoinput") {
           // console.log(device.label +
           //             " id = " + device.deviceId);
          // texto += device.label + "\n";
           cameras.push({
             label: device.label,
             kind: device.kind,
             id: device.deviceId,
             groupid: device.groupId
           });
         }

       });
     //console.log(cameras);
     constraints0 = {
         video: {
            deviceId: cameras[0].id,
             groupId: cameras[0].groupid,
             kind: cameras[0].kind,
             label: cameras[0].label

         }
     }
     constraints1 = {
         video: {
             deviceId: cameras[1].id,
             groupId: cameras[1].groupid,
             kind: cameras[1].kind,
             label: cameras[1].label
         }
     }

     constraints2 = {
         video: {
             deviceId: cameras[2].id,
             groupId: cameras[2].groupid,
             kind: cameras[2].kind,
             label: cameras[2].label
         }
     }

     constraints3 = {
         video: {
             deviceId: cameras[3].id,
             groupId: cameras[3].groupid,
             kind: cameras[3].kind,
             label: cameras[3].label
         }
     }



     })
     .catch(function(err) {
       // console.log(err.name + ": " + err.message);
       console.log(err);
     });

//}

//copy the device info from console to create constraints for the webcams
    // constraints0 = {
    //     video: {
    //        deviceId: cameras[0].id,
    //         groupId: cameras[0].groupid,
    //         kind: cameras[0].kind,
    //         label: cameras[0].label
    //
    //     }
    // }
    // constraints1 = {
    //     video: {
    //         deviceId: cameras[1].id,
    //         groupId: cameras[1].groupid,
    //         kind: cameras[1].kind,
    //         label: cameras[1].label
    //     }
    // }
