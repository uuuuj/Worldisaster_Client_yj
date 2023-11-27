// pages/video.js

import Head from 'next/head';
import { useEffect } from 'react';

const VideoPage = ({ videoUrl }) => {
  useEffect(() => {
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(document.getElementById('example-video'));
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        document.getElementById('example-video').play();
      });
    } else if (videojs('example-video').tech().canPlayType('application/vnd.apple.mpegurl')) {
      videojs('example-video').src(videoUrl);
      videojs('example-video').play();
    }
  }, [videoUrl]);

  return (
    <>
      <Head>
        <title>Video Test</title>
        <link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet" />
        <script src="https://unpkg.com/video.js/dist/video.js"></script>
        <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script>
      </Head>
      <body>
        <video id="example-video" width="960" height="540" className="video-js vjs-default-skin" controls>
          <source src={videoUrl} type="application/x-mpegURL" />
        </video>
      </body>
    </>
  );
};

export default VideoPage;

// getServerSideProps 또는 getStaticProps를 사용하여 videoUrl을 불러올 수 있습니다.
export async function getServerSideProps(context) {
    // 여기에 비디오 URL을 불러오는 로직을 작성하세요.
    // 예를 들면, 백엔드 API로부터 비디오 URL을 가져옵니다.
    const videoUrl = await fetchVideoUrl(context.params.id);
  
    return {
      props: {
        videoUrl, // 서버로부터 받은 비디오 URL을 props로 전달합니다.
      },
    };
  }
  
  // 이 함수는 백엔드 API로부터 비디오 URL을 가져오는 예시입니다.
  // 이 함수는 백엔드 API로부터 비디오 URL을 가져오는 예시입니다.
async function fetchVideoUrl(id) {
    const response = await fetch(`http://3.37.123.46/upload/${id}`);
    if (!response.ok) {
      // 응답이 성공적이지 않은 경우, 에러 핸들링을 해야 합니다.
      // 예를 들어, 에러 페이지를 렌더링하거나 기본 URL을 설정할 수 있습니다.
      throw new Error('Failed to fetch video URL');
    }
    const data = await response.json();
    return data.url;
  }
  