import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { mutate } from "swr";
import { fetcher } from "./fetcher";
let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/mindstreaks/upload";
//allows user to upload a photo
//asks phone for permission to access photos

export const openImagePickerAsync = async (me: any) => {
  //   const [selectedImage, setSelectedImage] = useState<any>();
  //   const [photo, setPhoto] = useState<any>();
  let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  //this tells the application to give an alert if someone doesn't allow //permission.  It will return to the previous screen.

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  //This gets image from phone

  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],

    //We need the image to be base64 in order to be formatted for Cloudinary

    base64: true,
  });

  //this just returns the user to the previous page if they click "cancel"

  if (pickerResult.cancelled === true) {
    return;
  }

  //sets image from imagePicker to SelectedImage.
  //This is if you are using hooks. The hook for this I have set up as:
  //[selectedImage, setSelectedImage] = useState("").  If you're using //anclass component you can use setState here.  This file format will be
  //a file path to where the image is saved.

  //   setSelectedImage({ localUri: pickerResult.uri });

  //***IMPORTANT*** This step is necessary.  It converts image from //file path format that imagePicker creates, into a form that cloudinary //requires.

  let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

  // Here we need to include your Cloudinary upload preset with can be //found in your Cloudinary dashboard.

  let data = {
    file: base64Img,
    upload_preset: "lpsabqxi",
  };

  //sends photo to cloudinary
  //**I initially tried using an axios request but it did NOT work** I was
  //not able to get this to work until I changed it to a fetch request.

  fetch(CLOUDINARY_URL, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  })
    .then(async (r) => {
      let data = await r.json();

      //Here I'm using another hook to set State for the photo that we get back //from Cloudinary
      console.log(`➡️ upload`, data.secure_url);
      //   setPhoto(data.secure_url);/
      await fetcher("/api/updateProfile", { imageUrl: data.secure_url });
      await mutate("/api/me");
    })
    .catch((err) => console.log(err));
};
