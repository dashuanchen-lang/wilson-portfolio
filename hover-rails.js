(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const records=new Set();
 function init(){for(const r of records)if(!r.el.isConnected){r.dispose();records.delete(r);}
  for(const el of document.querySelectorAll('.selling-rail,.animation-grid')){if(el.dataset.edgeRail)return;el.dataset.edgeRail='';el.classList.add('edge-rail');
   const shell=document.createElement('div');shell.className='edge-rail-shell';el.before(shell);shell.append(el);
   const controls=document.createElement('div');controls.className='edge-controls';controls.innerHTML='<button aria-label="向左浏览作品" title="向左浏览作品"><i data-lucide="chevron-left"></i></button><button aria-label="向右浏览作品" title="向右浏览作品"><i data-lucide="chevron-right"></i></button>';shell.append(controls);
   const hint=document.createElement('div');hint.className='edge-scroll-hint';hint.setAttribute('aria-hidden','true');hint.innerHTML='<span>滑动查看更多</span><span class="edge-scroll-hint-line"></span>';shell.append(hint);
   const leftZone=document.createElement('div');leftZone.className='edge-zone edge-zone-left';leftZone.setAttribute('aria-hidden','true');shell.append(leftZone);
   const rightZone=document.createElement('div');rightZone.className='edge-zone edge-zone-right';rightZone.setAttribute('aria-hidden','true');shell.append(rightZone);
   let direction=0,raf=0,last=0,dragging=false,dragMoved=false,dragStartX=0,dragStartScroll=0,suppressClick=false;const [prev,next]=controls.children;
   function update(){prev.disabled=el.scrollLeft<2;next.disabled=el.scrollLeft+el.clientWidth>=el.scrollWidth-3;prev.hidden=prev.disabled;next.hidden=next.disabled;}
   function stop(){direction=0;cancelAnimationFrame(raf);raf=0;last=0;el.classList.remove('edge-moving');}
   function start(nextDirection){if(reduced.matches||document.hidden||dragging||document.querySelector('#viewer[open]'))return;direction=nextDirection;el.dataset.edgeInteracted='true';if(!raf){el.classList.add('edge-moving');raf=requestAnimationFrame(tick);}}
   function tick(now){if(!direction||document.hidden||!el.isConnected)return stop();const delta=last?Math.min(now-last,40):16;last=now;el.scrollLeft+=direction*delta*.38;update();if((direction<0&&prev.disabled)||(direction>0&&next.disabled))return stop();raf=requestAnimationFrame(tick);}
   function beginDrag(e){if(e.pointerType!=='mouse'||e.button!==0)return;stop();dragging=true;dragMoved=false;dragStartX=e.clientX;dragStartScroll=el.scrollLeft;el.dataset.edgeInteracted='true';el.classList.add('edge-dragging');el.setPointerCapture?.(e.pointerId);e.preventDefault();}
   function moveDrag(e){if(!dragging)return;const distance=e.clientX-dragStartX;if(Math.abs(distance)>4)dragMoved=true;el.scrollLeft=dragStartScroll-distance;update();}
   function endDrag(e){if(!dragging)return;dragging=false;el.classList.remove('edge-dragging');if(dragMoved){suppressClick=true;setTimeout(()=>{suppressClick=false},0);}try{el.releasePointerCapture?.(e.pointerId)}catch{} }
   el.addEventListener('pointerdown',beginDrag);el.addEventListener('pointermove',moveDrag);el.addEventListener('pointerup',endDrag);el.addEventListener('pointercancel',endDrag);
   el.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}},true);
   [prev,next].forEach((b,i)=>{const d=i?1:-1;b.addEventListener('pointerenter',()=>start(d));b.addEventListener('pointerleave',stop);b.addEventListener('focus',()=>start(d));b.addEventListener('blur',stop);b.onclick=()=>{stop();el.scrollBy({left:d*(el.firstElementChild.getBoundingClientRect().width+24),behavior:reduced.matches?'instant':'smooth'});};});
   [[leftZone,-1],[rightZone,1]].forEach(([zone,d])=>{zone.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')start(d)});zone.addEventListener('pointerleave',stop);});
   el.addEventListener('pointerdown',stop);el.addEventListener('focusin',stop);
   el.addEventListener('scroll',update,{passive:true});const resize=new ResizeObserver(update);resize.observe(el);update();
   const hidden=()=>{if(document.hidden)stop();};document.addEventListener('visibilitychange',hidden);const reduce=()=>{if(reduced.matches)stop();};reduced.addEventListener('change',reduce);
   records.add({el,dispose(){stop();resize.disconnect();document.removeEventListener('visibilitychange',hidden);reduced.removeEventListener('change',reduce);}});
  }window.lucide?.createIcons();
 }
 init();
 window.addEventListener('hashchange',()=>requestAnimationFrame(init));
})();
