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