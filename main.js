// Write JavaScript here.

console.log("main.js loaded successfully!");

const svg = document.getElementById("road");
const path = document.getElementById("path");
const svgwidth = 100;
const svgheight = 25;
const bottom = svgheight;
const bottoml = 0;
const bottomr = svgwidth;
const vanish = 0;
const center = svgwidth/2;
const ratio = 0.5;

function turn(mouseX) {
  const displace = mouseX - center;
  const vanishpos = center + displace;
  const curve = ratio * -displace;
  const middley = svgheight/2;
  const middlexl = svgwidth/4;
  const middlexr = 3 * svgwidth/4;
  const left = 
    [`M ${bottoml},${bottom}`,
    `Q ${middlexl + curve},${middley}`,
    `${vanishpos},0`
    ].join(" ")
  const right = 
    [`M ${bottomr},${bottom}`,
    `Q ${middlexr + curve},${middley}`,
    `${vanishpos},0`
    ].join(" ")
  const d = `${left} ${right}`
  path.setAttribute("d", d)
}
turn(center)

document.addEventListener("mousemove", (e) => {
  const rect = svg.getBoundingClientRect();
  const mouseX = ((e.clientX - rect.left) / rect.width) * svgwidth;
  turn(mouseX);
});

//chatgpt test i didnt write any of the stuff below and also have no idea how it works but it makes it decelerate and accelerate the turning

let targetMouseX = center; // Initial target position for the vanish point
let vanishpos = center;
let middlexl = svgwidth / 4;
let middlexr = 3 * svgwidth / 4;

const dampingFactor = 0.05; // Controls how fast the vanish point follows the mouse

// Function to interpolate between two values
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Function to update the road path and vanish point positions smoothly
function update() {
  // Interpolate vanishpos towards the target mouse position
  vanishpos = lerp(vanishpos, targetMouseX, dampingFactor);
  
  // Interpolate middlexl and middlexr in the opposite direction of vanishpos
  middlexl = lerp(middlexl, svgwidth / 4 - (vanishpos - center) * ratio, dampingFactor);
  middlexr = lerp(middlexr, 3 * svgwidth / 4 - (vanishpos - center) * ratio, dampingFactor);
  
  // Update the road path
  const middley = svgheight / 2;
  const left = [`M ${bottoml},${bottom}`,
    `Q ${middlexl},${middley}`,
    `${vanishpos},0`
  ].join(" ");
  const right = [`M ${bottomr},${bottom}`,
    `Q ${middlexr},${middley}`,
    `${vanishpos},0`
  ].join(" ");
  
  const d = `${left} ${right}`;
  path.setAttribute("d", d);
  
  // Request the next frame
  requestAnimationFrame(update);
}

// Function to handle mouse movement
function onMouseMove(e) {
  const rect = svg.getBoundingClientRect();
  targetMouseX = ((e.clientX - rect.left) / rect.width) * svgwidth;
}

// Start the smooth update loop
update();

// Listen for mouse movement events
document.addEventListener("mousemove", onMouseMove);