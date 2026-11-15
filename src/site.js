(function(){
  var kop=document.getElementById('kop');
  function scroll(){kop&&kop.classList.toggle('vast',window.scrollY>40)}
  window.addEventListener('scroll',scroll,{passive:true});scroll();
  var els=document.querySelectorAll('.onthul');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('zicht')});return}
  var io=new IntersectionObserver(function(items){items.forEach(function(it){if(it.isIntersecting){it.target.classList.add('zicht');io.unobserve(it.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
