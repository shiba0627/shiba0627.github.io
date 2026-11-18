// Shared by blog.html and blog/*.html
(function(){
  var KEY = 'mugi-lang';
  var btn = document.getElementById('langBtn');
  function cur(){ return document.documentElement.dataset.lang === 'ja' ? 'ja' : 'en'; }
  function syncBtn(){ if (btn) btn.textContent = cur() === 'ja' ? 'English' : '日本語'; }
  function apply(l){
    document.documentElement.dataset.lang = l;
    document.documentElement.setAttribute('lang', l);
    try { localStorage.setItem(KEY, l); } catch(e) {}
    syncBtn();
  }
  syncBtn();
  if (btn) btn.addEventListener('click', function(){ apply(cur() === 'ja' ? 'en' : 'ja'); });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // category filter (list page only)
  var bar = document.getElementById('filters');
  if (!bar) return;
  var btns = bar.querySelectorAll('button');
  var entries = document.querySelectorAll('.entry');
  var empty = document.getElementById('empty');
  function filter(cat){
    btns.forEach(function(b){ b.classList.toggle('on', b.dataset.filter === cat); });
    var shown = 0;
    entries.forEach(function(el){
      var ok = (cat === 'all' || el.dataset.cat === cat);
      el.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    document.querySelectorAll('.year').forEach(function(yh){
      var n = yh.nextElementSibling, any = false;
      while (n && !n.classList.contains('year')){
        if (n.classList.contains('entry') && n.style.display !== 'none') any = true;
        n = n.nextElementSibling;
      }
      yh.style.display = any ? '' : 'none';
    });
    if (empty) empty.style.display = shown ? 'none' : 'block';
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ filter(b.dataset.filter); }); });
  var q = new URLSearchParams(location.search).get('cat');
  filter(q && /^(conference|life|site)$/.test(q) ? q : 'all');
})();
