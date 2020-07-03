import videojs from 'video.js';
import 'videojs-contrib-hls';

const options = {
  width: 640,
  height: 264,
  poster: 'https://avatars.githubusercontent.com/u/2245205?size=120',
  controls: true,
  autoplay: true,
  preload: "none",
  tectOrder: ["html5", "flash"],
  playbackRates: [0.5, 1, 1.5, 2, 4],
  sources: [{
    src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
    type: "application/x-mpegURL"
  }],
  ControlBar: {
    children: [
      "playToggle",
      "volumePanel",
      "progressControl",
      "currentTimeDisplay",
      "timeDivider",
      "durationDisplay",
      "playbackRateMenuButton",
      "fullscreenToggle"
    ]
  }
};

const videoPlayer = videojs('my-video', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on('ended', function () {
    videojs.log('Awww...over so soon?!');
  });
});

