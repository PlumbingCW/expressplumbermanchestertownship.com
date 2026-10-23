(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  /* mobile drawer */
  var toggle=d.querySelector('.menu-toggle'), drawer=d.querySelector('.mob-drawer'), overlay=d.querySelector('.mob-overlay'), closeBtn=d.querySelector('.mob-drawer__close');
  function setDrawer(open){
    if(!drawer||!toggle) return;
    drawer.classList.toggle('is-open',open);
    if(overlay) overlay.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',open?'true':'false');
    root.style.overflow=open?'hidden':'';
    if(open&&closeBtn) closeBtn.focus(); else if(!open) toggle.focus();
  }
  if(toggle) toggle.addEventListener('click',function(){setDrawer(true)});
  if(closeBtn) closeBtn.addEventListener('click',function(){setDrawer(false)});
  if(overlay) overlay.addEventListener('click',function(){setDrawer(false)});
  d.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(drawer&&drawer.classList.contains('is-open')) setDrawer(false);
      d.querySelectorAll('.nav-links li.is-open').forEach(function(li){li.classList.remove('is-open');var b=li.querySelector('.nav-drop__btn');if(b)b.setAttribute('aria-expanded','false')});
    }
  });
  window.addEventListener('resize',function(){ if(window.innerWidth>768&&drawer&&drawer.classList.contains('is-open')) setDrawer(false); });
  /* desktop dropdown buttons (keyboard and touch) */
  d.querySelectorAll('.nav-drop__btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      var li=btn.parentNode, open=!li.classList.contains('is-open');
      d.querySelectorAll('.nav-links li.is-open').forEach(function(o){o.classList.remove('is-open');var b=o.querySelector('.nav-drop__btn');if(b)b.setAttribute('aria-expanded','false')});
      if(open){li.classList.add('is-open');btn.setAttribute('aria-expanded','true')}
      e.stopPropagation();
    });
  });
  d.addEventListener('click',function(){
    d.querySelectorAll('.nav-links li.is-open').forEach(function(o){o.classList.remove('is-open');var b=o.querySelector('.nav-drop__btn');if(b)b.setAttribute('aria-expanded','false')});
  });
  /* FAQ accordion: max-height toggle */
  d.querySelectorAll('.faq__btn').forEach(function(btn){
    var panel=d.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click',function(){
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',open?'false':'true');
      panel.style.maxHeight=open?'0px':panel.scrollHeight+'px';
    });
  });
  window.addEventListener('resize',function(){
    d.querySelectorAll('.faq__btn[aria-expanded="true"]').forEach(function(b){var p=d.getElementById(b.getAttribute('aria-controls'));p.style.maxHeight=p.scrollHeight+'px'});
  });
})();
