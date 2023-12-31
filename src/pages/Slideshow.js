import React, { useEffect, useState } from 'react';

import Image from '../components/Image';
import { storage } from '../config/firebase';
import '../css/App.css';
import { getStorage, ref, list, getDownloadURL } from "firebase/storage";

function Slideshow() {
  const defaultimage = { _location: { path: "public/1" } }
  const [imageList, setImageList] = useState([]);
  const [currentimage, setCurrentImage] = useState(0);

  useEffect(() => {
    const storageRef = ref(storage, 'public/');
    list(storageRef).then((res) => {
      setImageList(res.items);
    })
    const interval = setInterval(() => {
      const storageRef = ref(storage, 'public/');
      list(storageRef).then((res) => {
        setImageList(res.items);
      })
    }, 600000);
    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentimage) => (currentimage === imageList.length - 1 ? 0 : currentimage + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [imageList])

  return (
    <div className="image-list">
      {
        imageList.map((img, index) => (
          <Image key={index} src={img} active={currentimage == index ? true : false} />
        ))
      }
    </div>
  );
}
export default Slideshow;
