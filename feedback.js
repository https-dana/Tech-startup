document.addEventListener("DOMContentLoaded", () => {
  initDetailsTooltip();
});

function initDetailsTooltip() {
  const details = document.getElementById("details");
  const tooltip = document.getElementById("details-tooltip");
  if (!details || !tooltip) return;

  details.addEventListener("mouseenter", () => {
    details.style.backgroundColor = "#fff8e1";
    details.style.border = "1px solid #f0c14b";
    details.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";

    tooltip.style.opacity = "1";
    tooltip.setAttribute("aria-hidden", "false");
  });

  details.addEventListener("mouseleave", () => {
    details.style.backgroundColor = "#ffffff";
    details.style.border = "1px solid #ccc";
    details.style.boxShadow = "none";

    tooltip.style.opacity = "0";
    tooltip.setAttribute("aria-hidden", "true");
  });
}
