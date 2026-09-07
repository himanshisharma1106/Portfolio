const themeBtn=document.getElementById("themeBtn"),menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navMenu");
themeBtn.addEventListener("click",()=>{document.body.classList.toggle("dark");themeBtn.textContent=document.body.classList.contains("dark")?"☀":"☾";localStorage.setItem("hs-theme",document.body.classList.contains("dark")?"dark":"light")});
if(localStorage.getItem("hs-theme")==="dark"){document.body.classList.add("dark");themeBtn.textContent="☀"}
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");let counted=false;
const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!counted){counted=true;counters.forEach(el=>{const target=+el.dataset.count;let start=0;const duration=900;const step=ts=>{if(!el._start)el._start=ts;const p=Math.min((ts-el._start)/duration,1);el.textContent=Math.floor(p*target)+(target===100&&p===1?"+":"");if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)})}}),{threshold:.5});
const stats=document.querySelector(".mini-stats");if(stats)countObserver.observe(stats);

const modal=document.getElementById("certModal"),modalTitle=document.getElementById("modalTitle"),modalOrg=document.getElementById("modalOrg"),modalDetail=document.getElementById("modalDetail"),modalImage=document.getElementById("modalImage");
document.querySelectorAll(".cert-card").forEach(card=>card.addEventListener("click",()=>{modalTitle.textContent=card.dataset.title;modalOrg.textContent=card.dataset.org;modalDetail.textContent=card.dataset.detail;modalImage.src=card.dataset.img;modalImage.alt=card.dataset.title+" certificate";modal.classList.add("active");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}));
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",()=>{modal.classList.remove("active");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){modal.classList.remove("active");document.body.style.overflow=""}});

const copyBtn=document.getElementById("copyEmail"),toast=document.getElementById("toast");
copyBtn.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(copyBtn.dataset.email);toast.textContent="Email copied to clipboard."}catch{toast.textContent=copyBtn.dataset.email}toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)});
