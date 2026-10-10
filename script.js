/* ============================================================
   WHATSAPP NUMBER: change ONLY this line.
   Country code + number, digits only, no + and no leading 0.
   Example (Tanzania): 'var WA_NUMBER='255787489637';'
   ============================================================ */
var WA_NUMBER='255787489637';

(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

/* WhatsApp links */
$$('[data-wa]').forEach(function(a){
  var msg=a.getAttribute('data-wa')||'Hello, I would like to ask about a safari.';
  a.href='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(msg);
  a.target='_blank';a.rel='noopener';
});
$$('[data-wa-num]').forEach(function(s){s.textContent='+'+WA_NUMBER});

/* Mobile menu */
var b=$('.burger'),n=$('#menu');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}})}

/* Midrange / Luxury toggle on itineraries */
$$('.itin').forEach(function(box){
  var btns=$$('.seg button',box);
  btns.forEach(function(bt){bt.addEventListener('click',function(){
    box.setAttribute('data-tier',bt.getAttribute('data-tier'));
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===bt)})})})});

/* FAQ search */
var q=$('#q');
if(q){var ds=$$('#faq-list details'),none=$('#none');
q.addEventListener('input',function(){var v=q.value.toLowerCase().trim(),c=0;
ds.forEach(function(d){var s=!v||d.textContent.toLowerCase().indexOf(v)>-1;d.style.display=s?'':'none';if(s)c++});
none.style.display=c?'none':'block'})}

/* Contact form: prefill from ?tour= and send by email */
var f=$('#f');
if(f){var i=$('#i'),m=$('#m'),p=new URLSearchParams(location.search),t=p.get('tour');
if(t){var l=t.toLowerCase();
i.value=/kilimanjaro|climb/.test(l)?'Kilimanjaro climb':/bird/.test(l)?'Birding and photography':/cultur/.test(l)?'Culture and heritage':'A safari package';
m.value='I am interested in: '+t+'.\nDates:\nNumber of travellers:\n'}
f.addEventListener('submit',function(ev){ev.preventDefault();
var s='Safari enquiry: '+i.value,
body='Name: '+$('#n').value+'\nEmail: '+$('#e').value+'\n\n'+m.value;
$('#ok').style.display='block';
window.location.href='mailto:mneleluke@gmail.com?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(body)})}

/* Gallery lightbox */
var items=$$('[data-lb]');
if(items.length){
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML='<button class="x" aria-label="Close">Close</button><button class="p" aria-label="Previous photo">Prev</button><img alt=""><p></p><button class="n" aria-label="Next photo">Next</button>';
  document.body.appendChild(lb);
  var im=$('img',lb),cap=$('p',lb),k=0;
  var show=function(x){k=(x+items.length)%items.length;var s=$('img',items[k]);im.src=s.src;im.alt=s.alt;cap.textContent=s.alt;lb.classList.add('open')};
  var hide=function(){lb.classList.remove('open');items[k].focus()};
  items.forEach(function(it,x){it.addEventListener('click',function(){show(x)})});
  $('.x',lb).addEventListener('click',hide);
  $('.p',lb).addEventListener('click',function(){show(k-1)});
  $('.n',lb).addEventListener('click',function(){show(k+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)hide()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')hide();if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)});
}
})();