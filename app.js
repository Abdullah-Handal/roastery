(() => {
  const $ = id => document.getElementById(id);
  const WA = "https://wa.me/966500000000";
  const msg = t => `${WA}?text=${encodeURIComponent(t)}`;
  const stops = [[0,[201,160,95]],[33,[142,88,48]],[66,[84,50,30]],[100,[38,23,16]]];
  const creases = [[90,60,28],[43,26,14],[20,12,8],[8,5,3]];
  const names = ["خفيف","متوسط","متوسط داكن","داكن"];
  const coffees = ["إثيوبيا يرغاتشيف","كولومبيا هويلا","اليمن حرَز","البرازيل سانتوس"];

  const mix = (v, tbl) => {
    let i = 0; while (i < tbl.length - 2 && v > tbl[i + 1][0]) i++;
    const [a, ca] = tbl[i], [b, cb] = tbl[i + 1], k = (v - a) / (b - a);
    return ca.map((x, j) => Math.round(x + (cb[j] - x) * k));
  };

  // order links: add a prefilled message to every coffee row
  const cups = [...document.querySelectorAll(".cup")];
  cups.forEach(c => {
    c.querySelector("a").href = msg(`السلام عليكم، أريد ${c.dataset.name} (250 غ). الطحن: `);
  });

  const input = $("level"), roast = document.querySelector(".roast");
  const update = () => {
    const v = +input.value, lvl = Math.min(3, Math.floor(v / 25));
    const [r, g, b] = mix(v, stops), [cr, cg, cb] = mix(v, creases.map((c, i) => [i * 33.4, c]));
    roast.style.setProperty("--bean", `rgb(${r},${g},${b})`);
    roast.style.setProperty("--crease", `rgb(${cr},${cg},${cb})`);
    roast.style.setProperty("--shine", (0.15 + v / 100 * 0.3).toFixed(2));
    roast.style.setProperty("--crease-w", (14 + v / 100 * 6).toFixed(1));
    roast.style.setProperty("--sz", (0.9 + v / 100 * 0.2).toFixed(3));
    const t = v / 100;
    $("tAcid").style.setProperty("--v", (1 - t * 0.85).toFixed(2));
    $("tSweet").style.setProperty("--v", (0.45 + 0.55 * Math.sin(Math.PI * t)).toFixed(2));
    $("tBitter").style.setProperty("--v", (0.15 + t * 0.85).toFixed(2));
    $("temp").textContent = Math.round(196 + v * 0.34);
    $("mins").textContent = Math.round(8 + v * 0.06);
    $("lvlName").textContent = names[lvl];
    $("recName").textContent = coffees[lvl];
    $("recBtn").href = msg(`السلام عليكم، أحب التحميص ${names[lvl]} وأريد ${coffees[lvl]} (250 غ). الطحن: `);
    $("beanSvg").setAttribute("aria-label", `حبة بن بتحميص ${names[lvl]}`);
    input.setAttribute("aria-valuetext", names[lvl]);
    if (touched) cups.forEach((c, i) => c.classList.toggle("match", i === lvl));
  };
  let touched = false;
  input.addEventListener("input", () => { touched = true; update(); });
  update();
})();
