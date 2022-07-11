(function(){
    const getProgress = ({elapsed, total}) =>
        Math.min(elapsed / total, 1);

    const easeOut = progress =>
      Math.pow(--progress, 5) + 1;

    const el = document.querySelector("span");
    const finalPosition = 600;

    const time = {
    start: performance.now(),
    total: 2000
    };

    const tick = now => {
        time.elapsed = now - time.start;
        const progress = easeOut(getProgress(time));
        const position = progress * finalPosition;
        el.style.transform = `translate(${position}px)`;
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
})();


//
(function(){
    const getProgress = ({elapsed, total}) =>
      Math.min(elapsed / total, 1);

    const easeInOut = progress =>
      (progress *= 2) < 1 ?
        .5 * Math.pow(progress, 5)
      :
        .5 * ((progress -= 2) * Math.pow(progress, 4) + 2);

    const element = document.querySelector("polygon");

    const shapes = {
      play: [85, 70, 180, 125, 180, 125, 85, 180],
      stop: [85, 85, 165,  85, 165, 165, 85, 165]
    };

    const time = {
      start: performance.now(),
      total: 1200
    };

    const tick = now => {
      time.elapsed = now - time.start;

      const progress = getProgress(time);
      const easing = easeInOut(progress);
      const {play, stop} = shapes;

      const points = play.map((start, index) => {
        const end = stop[index];
        const distance = end - start;
        const point = start + easing * distance;
        return point;
      });

      element.setAttribute("points", points.join(" "));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
})();


(function(){
  const getProgress = ({elapsed, total}) =>
    Math.min(elapsed / total, 1);

  const easeOut = progress =>
    Math.pow(--progress, 5) + 1;

  const getX = () =>
    Number(circle.getAttribute("cx"));

  const [gaussian, circle] = document.querySelectorAll("feGaussianBlur, circle.c");
  console.log(circle);
  console.log(gaussian);
  const startX = getX();
  const deviation = 25;

  const blur = start => {
    const time = {
      start,
      total: 800
    };

    const tick = now => {
      time.elapsed = now - time.start;
      const progress = deviation - deviation * getProgress(time);
      gaussian.setAttribute("stdDeviation", `${progress}, 0`);
      if (progress) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const move = () => {
    const distance = window.innerWidth - 2 * startX;
    const backwards = getX() > startX;

    const time = {
      start: performance.now(),
      total: 1500
    };

    const tick = now => {
      time.elapsed = now - time.start;

      const progress = getProgress(time);
      const easing = easeOut(progress) * distance;
      const delta = backwards ? distance - easing : easing;
      const cx = startX + delta;

      circle.setAttribute("cx", cx);
      progress < 1 ? requestAnimationFrame(tick) : setTimeout(move, 800);
    };

    blur(time.start);
    requestAnimationFrame(tick);
  };

  move();
})();


/* */
(function(){
  const random = (min, max) =>
    Math.random() * (max - min) + min;

  const color = () => {
    const h = Math.round(random(0, 360));
    const s = Math.round(random(42, 98));
    const l = Math.round(random(38, 90));
    return "hsl(" + h + "," + s + "%," + l + "%)";
  };

  const createCircles = (total, circles = []) => {
    if (!total) return circles;

    const element = document.createElementNS(ns, "circle");
    const x = random(-radius, maxX);

    element.setAttribute("r", radius);
    element.setAttribute("cx", x);
    element.setAttribute("cy", random(0, window.innerHeight));
    element.setAttribute("fill", color());

    circles.push({
      element,
      x,
      speed: random(1, 4)
    });

    return createCircles(total - 1, circles);
  };

  let maxX = window.innerWidth;
  window.addEventListener("resize", () => {
    maxX = window.innerWidth;
  });

  const ns = "http://www.w3.org/2000/svg";
  const radius = 70;
  const total = 200;
  const circles = createCircles(total);

  const tick = now => {
    for (let i = 0; i < total; i++) {
      const circle = circles[i];
      if (circle.x < maxX + radius) {
        circle.x += circle.speed;
      }
      else {
        circle.x = -radius;
      }
      circle.element.setAttribute("cx", circle.x);
    }
    requestAnimationFrame(tick);
  };

  document.body.appendChild(circles.reduce((parent, {element}) => {
    parent.appendChild(element);
    return parent;
  }, document.createElementNS(ns, "svg")));

  requestAnimationFrame(tick);
})();