const marshImages = [
    'img/marsh/marsh1.jpg',
    'img/marsh/marsh2.jpg',
    'img/marsh/marsh3.jpg'
  ];
  
  const westernImages = [
    'img/western/western1.jpg',
    'img/western/western2.jpg',
    'img/western/western3.jpg'
  ];
  
  const decayImages = [
    'img/decay/decay1.jpg',
    'img/decay/decay2.jpg',
    'img/decay/decay3.jpg'
  ];
  
  function startSlideshow(slideshowId, images) {
    let index = 0;
    const slideshow = document.getElementById(slideshowId);
    slideshow.style.backgroundImage = `url('${images[0]}')`;
  
    setInterval(() => {
      index = (index + 1) % images.length;
      slideshow.style.backgroundImage = `url('${images[index]}')`;
    }, 4000);
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    startSlideshow('slideshow-marsh', marshImages);
    startSlideshow('slideshow-western', westernImages);
    startSlideshow('slideshow-decay', decayImages);
  });
  