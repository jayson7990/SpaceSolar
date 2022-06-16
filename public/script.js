console.clear();

Splitting({ target: '.planet-title h1', by: 'chars' });

const elApp = document.querySelector('#app');

const elPlanets = Array.from(document.querySelectorAll('[data-planet]')).
reduce((acc, el) => {
  const planet = el.dataset.planet;

  acc[planet] = el;

  return acc;
}, {});

const planetKeys = Object.keys(elPlanets);

function getDetails(planet) {
  // radius, circumference, hours
  const details = Array.from(elPlanets[planet].
  querySelectorAll(`[data-detail]`)).
  reduce((acc, el) => {
    acc[el.dataset.detail] = el.innerHTML.trim();

    return acc;
  }, { planet });

  return details;
}

// ...........

let currentPlanetIndex = 0;
let currentPlanet = getDetails('sun');

(async function () {
  let initPlanet = elPlanets['sun'];
  const initpi = await (await fetch('http://localhost:8000/')).json()
  currentPlanet = getDetails('sun');
  let curCircumference = 2 * initpi.calculatePI * parseInt(currentPlanet.radius)
  initPlanet.querySelector('[data-detail="circumference"]').innerHTML = curCircumference
  initPlanet.querySelector('[data-detail="pi"]').innerHTML = "PI = "+initpi.calculatePI
})();

async function selectPlanet(planet) {
  const prevPlanet = currentPlanet;
  const elActive = document.querySelector('[data-active]');

  delete elActive.dataset.active;

  const elPlanet = elPlanets[planet];

  elPlanet.dataset.active = true;
  currentPlanet = getDetails(elPlanet.dataset.planet);

  const pi = await (await fetch('http://localhost:8000/')).json()
  console.log(pi.calculatePI)
  const elradiusDetail = elPlanet.querySelector('[data-detail="radius"]');
  animate.fromTo({
    from: +prevPlanet.radius,
    to: +currentPlanet.radius },
  value => {
    elradiusDetail.innerHTML = value.toFixed(0);
  });

  const elcircumferenceDetail = elPlanet.querySelector('[data-detail="circumference"]');
  const elPiDetail = elPlanet.querySelector('[data-detail="pi"]');
  const curCircumference = 2 * pi.calculatePI * parseInt(currentPlanet.radius)
  elcircumferenceDetail.innerHTML = curCircumference
  elPiDetail.innerHTML = "PI = "+pi.calculatePI

  animate.fromTo({
    from: +0,
    to: +curCircumference },
  value => {
    elcircumferenceDetail.innerHTML = value.toFixed(5);
  });
}

function selectPlanetByIndex(i) {
  currentPlanetIndex = i;
  elApp.style.setProperty('--active', i);
  selectPlanet(planetKeys[i]);
}

function animate(duration, fn) {
  const start = performance.now();
  const ticks = Math.ceil(duration / 16.666667);
  let progress = 0; // between 0 and 1, +/-

  function tick(now) {
    if (progress >= 1) {
      fn(1);
      return;
    }

    const elapsed = now - start;
    progress = elapsed / duration;

    // callback
    fn(progress); // number between 0 and 1

    requestAnimationFrame(tick); // every 16.6666667 ms
  }

  tick(start);
}

function easing(progress) {
  return (1 - Math.cos(progress * Math.PI)) / 2;
}

const animationDefaults = {
  duration: 1000,
  easing };


animate.fromTo = ({
  from,
  to,
  easing,
  duration },
fn) => {
  easing = easing || animationDefaults.easing;
  duration = duration || animationDefaults.duration;

  const delta = +to - +from;

  return animate(duration, progress => fn(from + easing(progress) * delta));
};


/* ---------------------------------- */

const svgNS = 'http://www.w3.org/2000/svg';
const elSvgNav = document.querySelector('.planet-nav svg');

const elTspans = [...document.querySelectorAll('tspan')];;
const length = elTspans.length - 1;

elSvgNav.style.setProperty('--length', length);

// Getting the length for distributing the text along the path
const elNavPath = document.querySelector('#navPath');
const elLastTspan = elTspans[length];
const navPathLength = elNavPath.getTotalLength() - elLastTspan.getComputedTextLength();

elTspans.forEach((tspan, i) => {
  let percent = i / length;

  tspan.setAttribute('x', percent * navPathLength);
  tspan.setAttributeNS(svgNS, 'x', percent * navPathLength);

  tspan.addEventListener('click', e => {
    e.preventDefault();
    selectPlanetByIndex(i);
  });

});