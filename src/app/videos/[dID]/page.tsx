"use client";
import { useRef, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function IndexPage() {
  const videoRef = useRef(null);
  const [videoUrls, setVideoUrl] = useState([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const pathname = usePathname().split('/');
  // console.log(pathname);
  const dID = pathname[2] //URL에서 dID 파라미터 추출
  // console.log(dID);
  useEffect(() => {
    
    //API 호출을 통해 비디오 URL 배열 가져오기
    async function fetchVideoUrls() {
      if (!dID) return;
      const response = await fetch(`http://3.37.123.46/api/upload/${dID}`);
      const data = await response.json();
      console.log(data.urls);
      setVideoUrl(data.urls);
      if(data.urls.length > 0) {
        setCurrentVideoUrl(data.urls[0]);
      }
    }

    fetchVideoUrls();
  }, [dID]); //dID가 변경될때마다 fetchVideoUrls() 실행

  useEffect(() => {
    if(videoRef.current && currentVideoUrl) {
      videojs(videoRef.current, {
        sources: [
          {
            src: currentVideoUrl,
            type: "application/x-mpegURL"
          }
        ]
      });
    }

  }, [currentVideoUrl]);

  return (
    <div>
      <video controls ref={videoRef} className="video-js" />
    </div>
  );
}
