(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=!reduced.matches&&!navigator.connection?.saveData;
 const visible=new Map();
 let active=null,timer=null;
 const icons=()=>window.lucide?.createIcons();
 function stop(){clearTimeout(timer);if(!active)return;active.host.classList.remove('previewing');active.video.pause();active.video.removeAttribute('src');active.video.load();active.video.remove();active=null;}
 function start(tile){
  if(!enabled||document.hidden||document.querySelector('#viewer[open]')||active?.tile===tile)return;
  stop();const host=tile.querySelector('.video-tile-image')||(tile.matches('.film-feature,.hero')?tile:null);if(!host)return;
  const video=document.createElement('video');video.className='motion-preview';video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-hidden','true');
  video.src='assets/previews/'+(tile.matches('.hero')?'hero':tile.dataset.video)+'.mp4';host.append(video);active={tile,host,video};
  video.addEventListener('playing',()=>{if(active?.video===video){video.classList.add('ready');host.classList.add('previewing');}});
  video.addEventListener('error',()=>{tile.dataset.previewFailed='true';if(active?.video===video)stop();},{once:true});video.play().catch(()=>{tile.dataset.previewFailed='true';if(active?.video===video)stop();});
 }
 function choose(){
  if(!enabled||document.hidden||document.querySelector('#viewer[open]')){stop();return;}
  for(const tile of visible.keys())if(!tile.isConnected)visible.delete(tile);
  const candidates=[...visible].filter(([tile,ratio])=>ratio>=.45&&!tile.dataset.previewFailed).sort((a,b)=>b[1]-a[1]);
  if(active&&active.tile.isConnected&&(visible.get(active.tile)||0)>=.45)return;
  if(candidates.length)start(candidates[0][0]);else stop();
 }
 const observer=new IntersectionObserver(entries=>{for(const e of entries)visible.set(e.target,e.intersectionRatio);choose();},{threshold:[0,.2,.45,.7,.9,1],rootMargin:'-85px 0px 0px 0px'});
 function sync(){document.querySelectorAll('[data-motion-toggle]').forEach(b=>{b.setAttribute('aria-pressed',String(enabled));b.setAttribute('aria-label',enabled?'暂停全部动态预览':'开启动态预览');b.title=enabled?'暂停全部动态预览':'开启动态预览';b.innerHTML=`<i data-lucide="${enabled?'pause':'play'}"></i><span>动态预览</span>`;});icons();}
 function toolbar(){const el=document.createElement('div');el.className='motion-tools';el.innerHTML='<button type="button" data-motion-toggle title="开启或关闭视频静音预览" aria-pressed="false"></button>';return el;}
 function enhance(){
  if(!document.querySelector('.global-motion')){const button=document.createElement('button');button.className='global-motion';button.dataset.motionToggle='';document.querySelector('.site-header').append(button);}
  if(active&&!active.tile.isConnected)stop();
  document.querySelectorAll('.animation-grid:not([data-motion-ready])').forEach(track=>{
   track.dataset.motionReady='';track.classList.add('motion-carousel');track.id='animation-carousel';track.setAttribute('aria-label','健身动物园作品轮播');
   const heading=track.previousElementSibling;heading.append(toolbar());const controls=document.createElement('div');controls.className='carousel-controls';
   controls.innerHTML='<button aria-label="上一组作品" title="上一组作品" aria-controls="animation-carousel"><i data-lucide="chevron-left"></i></button><button aria-label="下一组作品" title="下一组作品" aria-controls="animation-carousel"><i data-lucide="chevron-right"></i></button>';heading.append(controls);
   const [prev,next]=controls.children;const update=()=>{prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;};
   [prev,next].forEach((b,i)=>b.addEventListener('click',()=>{stop();track.scrollBy({left:(i?1:-1)*(track.firstElementChild.getBoundingClientRect().width+22),behavior:reduced.matches?'instant':'smooth'});}));
   track.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(track);update();
  });
  document.querySelectorAll('.selling-work .video-tile:not([data-preview-ready]),.animation-grid .video-tile:not([data-preview-ready]),.advertising-showcase .video-tile:not([data-preview-ready]),.film-feature:not([data-preview-ready])').forEach(tile=>{
   tile.dataset.previewReady='';observer.observe(tile);
   tile.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){clearTimeout(timer);timer=setTimeout(()=>start(tile),250);}});
   tile.addEventListener('pointerleave',()=>{clearTimeout(timer);choose();});tile.addEventListener('focus',()=>start(tile));tile.addEventListener('blur',choose);
  });sync();
 }
 document.addEventListener('click',e=>{if(e.target.closest('[data-motion-toggle]')){enabled=!enabled;window.portfolioMotionEnabled=enabled;window.dispatchEvent(new Event('portfolio-motion-change'));document.querySelectorAll('[data-preview-failed]').forEach(t=>delete t.dataset.previewFailed);stop();sync();choose();}if(e.target.closest('[data-video]'))stop();});
 document.querySelector('#viewer').addEventListener('close',choose);
 document.addEventListener('visibilitychange',choose);window.addEventListener('hashchange',()=>{stop();requestAnimationFrame(choose);});reduced.addEventListener('change',()=>{if(reduced.matches){enabled=false;stop();sync();}});
 // Route and series replacement insert new collections; ignore icon/video mutations.
 new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.series-collection,.section,.film-story,.selling-section,.product-selling')||n.querySelector?.('.series-collection')))))enhance();}).observe(document.querySelector('main'),{childList:true,subtree:true});enhance();
})();
