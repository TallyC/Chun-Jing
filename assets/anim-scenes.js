/* 純。淨 60 秒動畫：同一位在家人，「心散時／心收時」。程式繪製（現代平面風）。 */
(function(){
const SK='#efc9a8',HR='#2e323c',SH='#5a7ea3',SH2='#46678a',PT='#3a4259',PT2='#2c3347',D=Math.PI/180;
function stroke(c,p,w,col){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(p[0].x,p[0].y);for(let i=1;i<p.length;i++)c.lineTo(p[i].x,p[i].y);c.stroke();}
function dot(c,x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,7);c.fill();}
function rr(c,x,y,w,h,r,fill){c.fillStyle=fill;c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);c.fill();}
function fig(c,o){
  const u=o.F,outer=c.getTransform();
  c.save();c.translate(o.x,o.y);if(o.flip)c.scale(-1,1);
  c.translate((o.hx||0)*u,-(o.hy==null?.465:o.hy)*u);c.rotate((o.rot||0)*D);
  const seg=(p,l,a)=>({x:p.x+Math.sin(a*D)*l*u,y:p.y+Math.cos(a*D)*l*u});
  const O={x:0,y:0},tor=o.tor||0,hd=o.head||0;
  const sh=seg(O,.30,180-tor),hc=seg(sh,.105,180-tor-hd);
  const aL=o.aL||[6,2],aR=o.aR||[-6,-2],lL=o.lL||[0,0],lR=o.lR||[0,0];
  const arm=a=>{const e=seg(sh,.165,a[0]);return[sh,e,seg(e,.15,a[1])]};
  const leg=a=>{const k=seg(O,.235,a[0]);return[O,k,seg(k,.235,a[1])]};
  const lw=.058*u,bl=leg(lL),fl=leg(lR),ba=arm(aL),fa=arm(aR),shc=o.shirt||SH,shc2=o.shirt2||SH2;
  stroke(c,bl,lw,PT2);stroke(c,ba,lw*.85,shc2);
  stroke(c,[O,sh],.15*u,shc);
  stroke(c,fl,lw,PT);
  for(const l of [bl,fl]){const f=l[2];c.fillStyle='#2a2d36';c.beginPath();c.ellipse(f.x+.03*u,f.y+.008*u,.05*u,.02*u,0,0,7);c.fill();}
  stroke(c,fa,lw*.85,shc);
  for(const a of [ba,fa])dot(c,a[2].x,a[2].y,.03*u,SK);
  stroke(c,[sh,seg(sh,.06,180-tor-hd)],.04*u,SK);
  dot(c,hc.x,hc.y,.075*u,o.hair||HR);dot(c,hc.x+.014*u,hc.y+.012*u,.066*u,SK);
  c.strokeStyle=HR;c.fillStyle=HR;c.lineWidth=.012*u;c.lineCap='round';
  const ex=hc.x+.04*u,ey=hc.y+.004*u;
  if(o.eyes==='closed'){c.beginPath();c.arc(ex,ey-.004*u,.014*u,.1*Math.PI,.9*Math.PI);c.stroke();}
  else dot(c,ex,ey+(o.eyes==='down'?.01*u:0),.0075*u,HR);
  const m=c.getTransform();c.restore();
  const inv=c.getTransform().inverse();
  const g=p=>{const q=inv.transformPoint(m.transformPoint(new DOMPoint(p.x,p.y)));return{x:q.x,y:q.y}};
  return{hand:g(fa[2]),hand2:g(ba[2]),head:g(hc),foot:g(fl[2])};
}
function phone(c,x,y,s,rot,glow){c.save();c.translate(x,y);c.rotate((rot||0)*D);
  if(glow){const g=c.createRadialGradient(0,0,2,0,0,s*5);g.addColorStop(0,'rgba(140,200,255,.55)');g.addColorStop(1,'rgba(140,200,255,0)');c.fillStyle=g;c.fillRect(-s*5,-s*5,s*10,s*10);}
  rr(c,-s*.45,-s*.8,s*.9,s*1.6,s*.15,'#232733');rr(c,-s*.37,-s*.7,s*.74,s*1.4,s*.1,glow?'#a9d8ff':'#6b7488');c.restore();}
function cup(c,x,y,s,t,steam){rr(c,x-s*.5,y-s*.8,s,s*.8,s*.15,'#f4efe6');c.strokeStyle='#d9cdb8';c.lineWidth=s*.12;c.beginPath();c.arc(x+s*.52,y-s*.42,s*.22,-1.3,1.3);c.stroke();
  if(steam){c.strokeStyle='rgba(120,110,95,.45)';c.lineWidth=s*.09;c.lineCap='round';for(let i=-1;i<=1;i+=2){c.beginPath();c.moveTo(x+i*s*.2,y-s*.95);c.bezierCurveTo(x+i*s*.2+s*.18*Math.sin(t*2+i),y-s*1.2,x+i*s*.2-s*.18,y-s*1.4,x+i*s*.2+s*.1*Math.sin(t*2+i+1),y-s*1.65);c.stroke();}}}
function bowl(c,x,y,s){c.fillStyle='#f4efe6';c.beginPath();c.moveTo(x-s,y-s*.5);c.lineTo(x+s,y-s*.5);c.quadraticCurveTo(x+s*.9,y+s*.2,x,y+s*.2);c.quadraticCurveTo(x-s*.9,y+s*.2,x-s,y-s*.5);c.fill();rr(c,x-s*.85,y-s*.6,s*1.7,s*.22,s*.1,'#f3d9a4');}
function table(c,x,y,w,t){rr(c,x,y,w,t||8,3,'#c9a982');}
function noise(c,x,y,t,col){c.strokeStyle=col||'rgba(110,100,130,.55)';c.lineWidth=2;c.lineCap='round';for(let i=0;i<3;i++){const a=(-50+i*50)*D,r1=22,r2=34+((Math.sin(t*9+i)+1)*3);c.beginPath();c.moveTo(x+Math.cos(a-1.57)*r1,y+Math.sin(a-1.57)*r1);c.lineTo(x+Math.cos(a-1.57)*(r1+(r2-r1)*.5)+2,y+Math.sin(a-1.57)*(r1+(r2-r1)*.5)-2);c.lineTo(x+Math.cos(a-1.57)*r2,y+Math.sin(a-1.57)*r2);c.stroke();}}
function calm(c,x,y,t,r0){for(let i=0;i<3;i++){const p=((t*.35+i/3)%1);c.strokeStyle='rgba(214,170,90,'+(.38*(1-p))+')';c.lineWidth=2;c.beginPath();c.arc(x,y,(r0||22)+p*46,0,7);c.stroke();}}
function win(c,x,y,w,h,kind,t){rr(c,x,y,w,h,8,kind==='night'?'#2d3a55':'#cfe6f5');
  if(kind==='night'){dot(c,x+w*.68,y+h*.3,w*.12,'#f6ecc9');}
  else{c.fillStyle='rgba(255,255,255,.9)';for(const [a,b,r] of [[.3,.35,.13],[.42,.38,.1],[.6,.55,.12]]){dot(c,x+w*((a+t*.01)%1),y+h*b,w*r*.7,'rgba(255,255,255,.9)');}}
  c.strokeStyle='#b6a88f';c.lineWidth=3;c.strokeRect(x,y,w,h);c.beginPath();c.moveTo(x+w/2,y);c.lineTo(x+w/2,y+h);c.stroke();}
function bird(c,x,y,s,t){c.strokeStyle='#4a5468';c.lineWidth=2;c.lineCap='round';const f=Math.sin(t*6)*s*.3;c.beginPath();c.moveTo(x-s,y+f);c.quadraticCurveTo(x-s*.4,y-s*.5,x,y);c.quadraticCurveTo(x+s*.4,y-s*.5,x+s,y+f);c.stroke();}
function bed(c,e,x0,x1){rr(c,x0,e.G-e.F*.16,x1-x0,e.F*.12,6,'#e8e4f0');rr(c,x0,e.G-e.F*.05,x1-x0,e.F*.05,3,'#9aa5be');rr(c,x0+4,e.G-e.F*.24,e.F*.3,e.F*.1,10,'#fbfaf6');}
function chair(c,e,x,w){rr(c,x,e.G-e.F*.245,w,e.F*.03,3,'#a8896a');c.fillStyle='#a8896a';c.fillRect(x+4,e.G-e.F*.215,5,e.F*.215);c.fillRect(x+w-9,e.G-e.F*.215,5,e.F*.215);}
function sofa(c,e,x,w){rr(c,x,e.G-e.F*.30,w,e.F*.3,16,'#8b92a8');rr(c,x-6,e.G-e.F*.52,16,e.F*.52,10,'#7c839b');}

const bob=(t,a,s)=>Math.sin(t*(s||2))*(a||1);
/* 每格 [散, 收]；e: W,H,G(地面y),F(人高),t,cx */
const V=[
 // 1 鬧鐘滑手機 / 醒來先坐
 [(c,e)=>{bed(c,e,e.W*.08,e.W*.92);const p=fig(c,{x:e.W*.62,y:e.G-e.F*.17,F:e.F,rot:-90,hy:.23,tor:0,head:-8,aR:[80,100],aL:[70,95],lL:[2,0],lR:[5,3]});phone(c,p.hand.x,p.hand.y-e.F*.03,e.F*.09,0,true);
   c.strokeStyle='rgba(120,110,150,.6)';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.arc(e.W*.86,e.G-e.F*.46,10+i*7+Math.abs(bob(e.t,2,8)),-.6,.6);c.stroke();}dot(c,e.W*.86,e.G-e.F*.46,8,'#c5c9d6');},
  (c,e)=>{bed(c,e,e.W*.08,e.W*.92);win(c,e.W*.64,e.H*.1,e.W*.26,e.H*.34,'day',e.t);fig(c,{x:e.W*.4,y:e.G-e.F*.15,F:e.F,hy:.07,hx:0,tor:bob(e.t,1.5,1.6),head:2,eyes:'closed',aL:[30,75],aR:[25,70],lL:[85,-95],lR:[80,-100]});calm(c,e.W*.4+e.F*.04,e.G-e.F*.74,e.t,18);}],
 // 2 低頭趕路 / 走穩
 [(c,e)=>{const s=Math.sin(e.t*7);fig(c,{x:e.cx+bob(e.t,3,3),y:e.G,F:e.F,hy:.445,tor:20,head:14,eyes:'down',lL:[-30+s*12,-48],lR:[28-s*12,6],aL:[30,60],aR:[-35,-60]});c.strokeStyle='rgba(120,110,150,.5)';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.moveTo(e.cx-e.F*.4-i*16,e.G-e.F*.8+i*18);c.lineTo(e.cx-e.F*.6-i*16,e.G-e.F*.8+i*18);c.stroke();}},
  (c,e)=>{const s=Math.sin(e.t*2.2);for(let i=0;i<4;i++)dot(c,e.cx-e.F*.5-i*26,e.G+4,3,'rgba(214,170,90,'+(.5-i*.1)+')');fig(c,{x:e.cx,y:e.G,F:e.F,hy:.455,tor:2,head:-2,lL:[-14+s*8,-20],lR:[12-s*8,2],aL:[10,6],aR:[-12,-8]});}],
 // 3 通勤滑手機 / 看窗外
 [(c,e)=>{rr(c,0,e.H*.12,e.W,e.H*.06,3,'#aab0c2');const p=fig(c,{x:e.cx,y:e.G,F:e.F,tor:10,head:22,eyes:'down',aR:[-30,-110],aL:[-4,-170]});phone(c,p.hand.x+4,p.hand.y-6,e.F*.09,-12,true);noise(c,p.head.x,p.head.y-e.F*.08,e.t);},
  (c,e)=>{win(c,e.W*.55,e.H*.14,e.W*.34,e.H*.46,'day',e.t);const p=fig(c,{x:e.cx*.8,y:e.G,F:e.F,tor:-2,head:-4,aL:[-5,-170],aR:[0,0]});calm(c,p.head.x+e.F*.1,p.head.y,e.t,14);}],
 // 4 深夜滑螢幕 / 安睡
 [(c,e)=>{sofa(c,e,e.W*.1,e.W*.55);const p=fig(c,{x:e.W*.34,y:e.G-e.F*.18,F:e.F,hy:.235,tor:-14,head:10,eyes:'down',lL:[80,10],lR:[82,14],aR:[-60,-110],aL:[-50,-100]});phone(c,p.hand.x+6,p.hand.y-4,e.F*.09,-30,true);c.fillStyle='rgba(30,36,60,.18)';c.fillRect(0,0,e.W,e.H);},
  (c,e)=>{win(c,e.W*.62,e.H*.1,e.W*.28,e.H*.36,'night',e.t);bed(c,e,e.W*.08,e.W*.9);fig(c,{x:e.W*.64,y:e.G-e.F*.17,F:e.F,rot:-90,hy:.23,eyes:'closed',aR:[-8,-4],aL:[-12,-6],lL:[2,0],lR:[4,2]});c.fillStyle='rgba(150,170,230,.5)';c.font='bold '+(e.F*.12)+'px serif';c.fillText('z',e.W*.2,e.H*.36);c.fillText('z',e.W*.25,e.H*.28+bob(e.t,3));}],
 // 5 衣櫃猶豫 / 整衣
 [(c,e)=>{rr(c,e.W*.58,e.H*.08,e.W*.32,e.G-e.H*.08,6,'#b9a78c');c.fillStyle='#a69379';c.fillRect(e.W*.74-1,e.H*.1,2,e.G-e.H*.12);for(const [x,col] of [[.62,'#c9d4e8'],[.67,'#e6cfcf'],[.79,'#d6d9b9'],[.84,'#b9c4d6']])rr(c,e.W*x,e.H*.16,e.W*.045,e.F*.5,4,col);
   const p=fig(c,{x:e.W*.34,y:e.G,F:e.F,tor:4,head:-6,aR:[-110,-150],aL:[-30,-120]});c.fillStyle='#7a6f9a';c.font='bold '+(e.F*.16)+'px serif';c.fillText('?',p.head.x-e.F*.18,p.head.y-e.F*.1+bob(e.t,2));c.fillText('?',p.head.x+e.F*.06,p.head.y-e.F*.2);},
  (c,e)=>{table(c,e.W*.28,e.G-e.F*.46,e.W*.5,8);c.fillStyle='#a8896a';c.fillRect(e.W*.3,e.G-e.F*.46+8,6,e.F*.46);c.fillRect(e.W*.74,e.G-e.F*.46+8,6,e.F*.46);rr(c,e.W*.45,e.G-e.F*.46-12,e.W*.24,12,4,'#c9d4e8');rr(c,e.W*.46,e.G-e.F*.46-22,e.W*.22,11,4,'#dfe7f3');
   fig(c,{x:e.W*.2,y:e.G,F:e.F,tor:10,head:6,eyes:'down',aR:[-60,-95],aL:[-40,-85]});}],
 // 6 邊走邊咖啡 / 坐下捧杯
 [(c,e)=>{const s=Math.sin(e.t*7);const p=fig(c,{x:e.cx,y:e.G,F:e.F,hy:.445,tor:16,head:8,lL:[-28+s*12,-45],lR:[26-s*12,5],aR:[-70,-105],aL:[20,40]});cup(c,p.hand.x+3,p.hand.y+6,e.F*.09,e.t,false);c.fillStyle='#8a5a44';for(let i=0;i<3;i++)dot(c,p.hand.x+10+i*6,p.hand.y+16+((e.t*40+i*9)%22),2.4,'rgba(138,90,68,.8)');},
  (c,e)=>{chair(c,e,e.W*.2,e.W*.3);const p=fig(c,{x:e.W*.33,y:e.G,F:e.F,hy:.245,tor:2,head:4,eyes:'closed',lL:[88,0],lR:[90,0],aR:[-55,-100],aL:[-45,-95]});cup(c,p.hand.x+6,p.hand.y+4,e.F*.1,e.t,true);}],
 // 7 匆忙吃飯 / 專心吃
 [(c,e)=>{table(c,e.W*.45,e.G-e.F*.46,e.W*.45,8);chair(c,e,e.W*.12,e.W*.26);const p=fig(c,{x:e.W*.27,y:e.G,F:e.F,hy:.245,tor:16,head:16,eyes:'down',lL:[88,0],lR:[90,0],aR:[-50,-120],aL:[-35,-100]});bowl(c,e.W*.62,e.G-e.F*.46,e.F*.1);phone(c,e.W*.82,e.G-e.F*.46-e.F*.12,e.F*.1,70,true);c.strokeStyle='rgba(120,110,150,.5)';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.moveTo(e.W*.05,e.H*.2+i*12);c.lineTo(e.W*.14+Math.abs(bob(e.t,4,5)),e.H*.2+i*12);c.stroke();}},
  (c,e)=>{table(c,e.W*.45,e.G-e.F*.46,e.W*.45,8);chair(c,e,e.W*.12,e.W*.26);const p=fig(c,{x:e.W*.27,y:e.G,F:e.F,hy:.245,tor:4+bob(e.t,1,2),head:6,eyes:'closed',lL:[88,0],lR:[90,0],aR:[-60,-115],aL:[-40,-100]});bowl(c,e.W*.58,e.G-e.F*.46,e.F*.1);dot(c,e.W*.74,e.G-e.F*.46-6,0,'#000');rr(c,e.W*.72,e.G-e.F*.46-5,e.F*.12,5,3,'#e7b4a0');calm(c,e.W*.58,e.G-e.F*.62,e.t,10);}],
 // 8 亂放 / 收碗擦桌
 [(c,e)=>{table(c,e.W*.1,e.G-e.F*.46,e.W*.5,8);bowl(c,e.W*.2,e.G-e.F*.46,e.F*.1);bowl(c,e.W*.38,e.G-e.F*.46-2,e.F*.09);rr(c,e.W*.48,e.G-e.F*.46-10,e.F*.16,10,3,'#e7b4a0');c.save();c.translate(e.W*.5,e.G-e.F*.46-30);c.rotate(.5);rr(c,0,0,e.F*.1,e.F*.05,2,'#dadde6');c.restore();const s=Math.sin(e.t*6);fig(c,{x:e.W*.78,y:e.G,F:e.F,flip:true,hy:.45,tor:10,head:10,eyes:'dot',lL:[-20+s*8,-34],lR:[22-s*8,4],aL:[30,40],aR:[-20,-40]});},
  (c,e)=>{table(c,e.W*.1,e.G-e.F*.46,e.W*.55,8);c.fillStyle='#f4efe6';for(let i=0;i<3;i++)bowl(c,e.W*.2,e.G-e.F*.46-i*7,e.F*.1-i*1.5);const x=e.W*.32+Math.sin(e.t*3)*e.F*.08;rr(c,x,e.G-e.F*.46-7,e.F*.12,7,3,'#e6c97a');fig(c,{x:e.W*.7,y:e.G,F:e.F,flip:true,hy:.46,tor:12,head:10,eyes:'down',aR:[-75+Math.sin(e.t*3)*8,-98],aL:[-30,-60]});}],
 // 9 訊息焦慮 / 深呼吸
 [(c,e)=>{const p=fig(c,{x:e.cx,y:e.G,F:e.F,tor:6,head:12,eyes:'dot',aR:[-140,-200],aL:[-120,-190]});for(let i=0;i<3;i++){phone(c,e.W*(.14+i*.06),e.H*(.22+i*.12)+bob(e.t+i,3,6),e.F*.07,i*14-10,true);}noise(c,p.head.x,p.head.y-e.F*.08,e.t);},
  (c,e)=>{const br=Math.sin(e.t*1.6);const p=fig(c,{x:e.cx,y:e.G,F:e.F,tor:-1+br*1.2,head:-2,eyes:'closed',aR:[-40,-120],aL:[-10,-5]});c.strokeStyle='rgba(214,170,90,.55)';c.lineWidth=2.5;c.beginPath();c.arc(p.hand.x-e.F*.06,p.hand.y,e.F*(.12+(br+1)*.04),0,7);c.stroke();calm(c,p.hand.x-e.F*.06,p.hand.y,e.t,e.F*.14);}],
 // 10 煩亂 / 面對處理
 [(c,e)=>{const p=fig(c,{x:e.cx,y:e.G,F:e.F,tor:8,head:12,eyes:'dot',aR:[-100,-160],aL:[-110,-170]});c.strokeStyle='#6d6a8a';c.lineWidth=2;c.beginPath();let x=p.head.x,y=p.head.y-e.F*.28;c.moveTo(x,y);for(let i=0;i<46;i++){const a=i*.9+e.t*3;c.lineTo(x+Math.cos(a)*(8+i*.45),y+Math.sin(a*1.3)*(7+i*.4));}c.stroke();},
  (c,e)=>{const p=fig(c,{x:e.W*.38,y:e.G,F:e.F,tor:3,head:0,aR:[-45,-85],aL:[-10,-20]});rr(c,e.W*.64,e.G-e.F*.3,e.F*.3,e.F*.3,6,'#e9d7ae');c.strokeStyle='#b8996a';c.lineWidth=3;c.beginPath();c.moveTo(e.W*.64,e.G-e.F*.2);c.lineTo(e.W*.64+e.F*.3,e.G-e.F*.2);c.stroke();c.strokeStyle='rgba(214,170,90,.8)';c.lineWidth=2.4;c.beginPath();let x=p.head.x,y=p.head.y-e.F*.26;c.arc(x,y,16,0,7);c.stroke();c.beginPath();c.moveTo(x-30,y);c.lineTo(x-20,y);c.moveTo(x+20,y);c.lineTo(x+30,y);c.stroke();}],
 // 11 背對嘆氣 / 倒茶傾聽
 [(c,e)=>{const p=fig(c,{x:e.W*.58,y:e.G,F:e.F,flip:true,tor:8,head:10,eyes:'dot',aL:[8,20],aR:[10,20]});fig(c,{x:e.W*.18,y:e.G,F:e.F*.75,shirt:'#c58f7e',shirt2:'#a97565',hair:'#8a7a6a',hy:.465});c.strokeStyle='rgba(120,110,150,.55)';c.lineWidth=2.5;c.beginPath();c.arc(p.head.x+e.F*.1,p.head.y-e.F*.12,10,Math.PI*.7,Math.PI*2.2);c.stroke();},
  (c,e)=>{table(c,e.W*.32,e.G-e.F*.46,e.W*.3,8);const p=fig(c,{x:e.W*.2,y:e.G,F:e.F,tor:6,head:6,eyes:'dot',aR:[-65,-95],aL:[-20,-30]});cup(c,e.W*.4,e.G-e.F*.46,e.F*.1,e.t,true);cup(c,e.W*.54,e.G-e.F*.46,e.F*.1,e.t+1,true);fig(c,{x:e.W*.8,y:e.G,F:e.F*.9,flip:true,shirt:'#c58f7e',shirt2:'#a97565',hair:'#8a7a6a',tor:2,head:2,aR:[-40,-60]});}],
 // 12 加班 / 放鬆收桌
 [(c,e)=>{table(c,e.W*.38,e.G-e.F*.46,e.W*.5,8);chair(c,e,e.W*.1,e.W*.26);c.fillStyle='rgba(40,46,70,.2)';c.fillRect(0,0,e.W,e.H);const p=fig(c,{x:e.W*.24,y:e.G,F:e.F,hy:.245,tor:22,head:20,eyes:'down',lL:[88,0],lR:[90,0],aR:[-72,-100],aL:[-62,-96]});rr(c,e.W*.52,e.G-e.F*.46-e.F*.2,e.F*.3,e.F*.2,4,'#2f3446');rr(c,e.W*.535,e.G-e.F*.46-e.F*.185,e.F*.27,e.F*.17,3,'#b9d4f0');for(let i=0;i<4;i++)rr(c,e.W*.4+i*10,e.G-e.F*.46-5-(i%2)*4,16,4,1,'#f1f1f1');dot(c,e.W*.84,e.H*.16,10,'#f2e7c4');noise(c,p.head.x,p.head.y-e.F*.08,e.t);},
  (c,e)=>{table(c,e.W*.38,e.G-e.F*.46,e.W*.5,8);chair(c,e,e.W*.1,e.W*.26);fig(c,{x:e.W*.24,y:e.G,F:e.F,hy:.245,tor:bob(e.t,1.2,1.5),head:0,eyes:'closed',lL:[88,0],lR:[90,0],aR:[-40,-85],aL:[-30,-78]});rr(c,e.W*.52,e.G-e.F*.46-e.F*.2,e.F*.3,e.F*.2,4,'#2f3446');rr(c,e.W*.535,e.G-e.F*.46-e.F*.185,e.F*.27,e.F*.17,3,'#e3eefa');rr(c,e.W*.76,e.G-e.F*.46-e.F*.14,e.F*.1,e.F*.14,4,'#a8b99a');dot(c,e.W*.81,e.G-e.F*.46-e.F*.18,e.F*.06,'#7fa07a');}],
 // 13 水窪 / 雨中看腳下
 [(c,e)=>{const s=Math.sin(e.t*7);c.fillStyle='rgba(120,140,175,.55)';c.beginPath();c.ellipse(e.cx+e.F*.2,e.G+2,e.F*.3,e.F*.05,0,0,7);c.fill();fig(c,{x:e.cx-e.F*.1,y:e.G,F:e.F,hy:.44,tor:18,head:8,lL:[-30+s*10,-50],lR:[30-s*10,10],aR:[-50,-70],aL:[30,50]});c.strokeStyle='rgba(120,140,175,.8)';c.lineWidth=2;for(let i=0;i<6;i++){c.beginPath();c.moveTo(e.cx+e.F*.2+(i-3)*8,e.G-4);c.lineTo(e.cx+e.F*.2+(i-3)*14,e.G-14-Math.abs(bob(e.t+i,6,6)));c.stroke();}},
  (c,e)=>{const s=Math.sin(e.t*2);c.fillStyle='rgba(120,140,175,.4)';c.beginPath();c.ellipse(e.cx+e.F*.4,e.G+2,e.F*.26,e.F*.04,0,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;c.beginPath();c.ellipse(e.cx+e.F*.4,e.G+2,e.F*.26*(.6+.2*Math.sin(e.t*2)),e.F*.03,0,0,7);c.stroke();const p=fig(c,{x:e.cx-e.F*.1,y:e.G,F:e.F,hy:.455,tor:6,head:14,eyes:'down',lL:[-12+s*7,-18],lR:[10-s*7,2],aR:[-100,-140],aL:[8,4]});c.strokeStyle='#8a94ae';c.lineWidth=3;c.beginPath();c.moveTo(p.hand.x,p.hand.y);c.lineTo(p.hand.x+4,p.hand.y-e.F*.55);c.stroke();c.fillStyle='#e9a48a';c.beginPath();c.arc(p.hand.x+4,p.hand.y-e.F*.5,e.F*.3,Math.PI,0);c.closePath();c.fill();}],
 // 14 樹枝 / 移開
 [(c,e)=>{c.save();c.translate(e.W*.62,e.G+4);c.rotate(-.08);rr(c,-e.F*.3,-6,e.F*.6,8,4,'#8f7456');c.restore();const s=Math.sin(e.t*5);fig(c,{x:e.W*.3+bob(e.t,2,2),y:e.G,F:e.F,hy:.445,tor:6,head:2,lL:[-24+s*10,-40],lR:[22-s*10,6],aL:[20,30],aR:[-22,-34]});},
  (c,e)=>{const t=Math.min(1,(Math.sin(e.t*1.3)+1)/2);const p=fig(c,{x:e.W*.4,y:e.G,F:e.F,hy:.3,tor:46,head:10,eyes:'down',lL:[60,-35],lR:[40,-5],aR:[-30+t*10,-4],aL:[-10,-20]});c.save();c.translate(p.hand.x+e.F*.1,p.hand.y);c.rotate(-.5);rr(c,-e.F*.28,-4,e.F*.5,7,3,'#8f7456');c.restore();calm(c,p.head.x,p.head.y,e.t,18);}],
 // 15 耳機 / 看雲看鳥
 [(c,e)=>{win(c,e.W*.6,e.H*.12,e.W*.3,e.H*.46,'day',0);c.fillStyle='rgba(80,86,110,.35)';c.fillRect(e.W*.6,e.H*.12,e.W*.3,e.H*.46);const p=fig(c,{x:e.W*.32,y:e.G,F:e.F,tor:6,head:12,eyes:'dot',aR:[-20,-35],aL:[-6,-4]});c.strokeStyle='#2e323c';c.lineWidth=3;c.beginPath();c.arc(p.head.x,p.head.y-2,e.F*.085,Math.PI*1.05,Math.PI*1.95);c.stroke();dot(c,p.head.x-e.F*.07,p.head.y+2,e.F*.026,'#2e323c');c.strokeStyle='rgba(110,100,140,.55)';c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.arc(p.head.x-e.F*.1,p.head.y-e.F*.06,e.F*(.1+i*.05),Math.PI*1.1,Math.PI*1.6);c.stroke();}},
  (c,e)=>{win(c,e.W*.5,e.H*.1,e.W*.4,e.H*.5,'day',e.t);bird(c,e.W*(.62+((e.t*.05)%.2)),e.H*.28,8,e.t);bird(c,e.W*(.74+((e.t*.04)%.1)),e.H*.2,6,e.t+1);const p=fig(c,{x:e.W*.28,y:e.G,F:e.F,tor:-2,head:-8,aR:[-35,-70],aL:[-4,-4]});c.strokeStyle='#2e323c';c.lineWidth=3;c.beginPath();c.moveTo(p.hand.x,p.hand.y);c.quadraticCurveTo(p.hand.x+6,p.hand.y+16,p.hand.x-2,p.hand.y+20);c.stroke();}],
 // 16 亂丟 / 撿起分類
 [(c,e)=>{const s=Math.sin(e.t*5);const p=fig(c,{x:e.W*.3,y:e.G,F:e.F,hy:.45,tor:8,head:6,lL:[-12,-18],lR:[12,2],aR:[100,120],aL:[15,20]});const k=(e.t*1.2)%1;const bx=p.hand.x+k*e.W*.38,by=p.hand.y-Math.sin(k*Math.PI)*e.F*.25+k*e.F*.4;c.save();c.translate(bx,by);c.rotate(k*6);rr(c,-4,-9,8,18,3,'#9ac4d8');c.restore();for(const x of [.62,.72])rr(c,e.W*x,e.G-8,12,6,2,'#c3b9a2');},
  (c,e)=>{rr(c,e.W*.6,e.G-e.F*.28,e.F*.2,e.F*.28,4,'#6f9a86');rr(c,e.W*.6-3,e.G-e.F*.3,e.F*.2+6,e.F*.04,2,'#5a8571');rr(c,e.W*.73,e.G-e.F*.28,e.F*.2,e.F*.28,4,'#7b94b5');rr(c,e.W*.73-3,e.G-e.F*.3,e.F*.2+6,e.F*.04,2,'#667f9f');const k=(Math.sin(e.t*1.4)+1)/2;const p=fig(c,{x:e.W*.34,y:e.G,F:e.F,hy:.34,tor:34,head:6,eyes:'down',lL:[40,-30],lR:[30,0],aR:[-40-k*60,-60-k*30],aL:[-10,-30]});c.save();c.translate(p.hand.x,p.hand.y);c.rotate(.3);rr(c,-3,-8,7,15,3,'#9ac4d8');c.restore();}]
];

function card(c,e,warm){const g=c.createLinearGradient(0,0,0,e.H);
  if(warm){g.addColorStop(0,'#fff8e8');g.addColorStop(1,'#f4e2bd');}else{g.addColorStop(0,'#e6e9f1');g.addColorStop(1,'#cdd2df');}
  c.fillStyle=g;c.fillRect(0,0,e.W,e.H);
  if(warm){const r=c.createRadialGradient(e.W*.85,e.H*.1,5,e.W*.85,e.H*.1,e.W*.6);r.addColorStop(0,'rgba(255,230,160,.65)');r.addColorStop(1,'rgba(255,230,160,0)');c.fillStyle=r;c.fillRect(0,0,e.W,e.H);}
  c.fillStyle=warm?'#e9d3a6':'#b8bdcc';c.fillRect(0,e.G,e.W,e.H-e.G);}

window.drawScene=function(c,idx,W,H,t){
  const gap=3,ph=(H-gap)/2;
  for(let k=0;k<2;k++){
    const e={W,H:ph,G:ph*.88,F:ph*.70,t:t+k*.7,cx:W*.45};
    c.save();c.translate(0,k*(ph+gap));c.beginPath();c.rect(0,0,W,ph);c.clip();
    card(c,e,k===1);V[idx][k](c,e);c.restore();
  }
  c.fillStyle='rgba(255,255,255,.9)';c.fillRect(0,ph,W,gap);
};
window.drawFinale=function(c,W,H,t){
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#f6efe0');g.addColorStop(.62,'#e9dcc0');g.addColorStop(1,'#cfd7e3');c.fillStyle=g;c.fillRect(0,0,W,H);
  const mx=W/2,my=H*.34,r=Math.min(W,H)*.16;
  const gl=c.createRadialGradient(mx,my,r*.3,mx,my,r*3);gl.addColorStop(0,'rgba(255,240,200,.8)');gl.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=gl;c.fillRect(0,0,W,H);
  dot(c,mx,my,r,'#fffaf0');
  c.fillStyle='rgba(180,200,225,.55)';c.fillRect(0,H*.62,W,H*.38);
  for(let i=0;i<7;i++){const w=r*(1.6-i*.18)*(1+.04*Math.sin(t*1.5+i)),y=H*.64+i*H*.04;c.fillStyle='rgba(255,250,235,'+(.7-i*.08)+')';c.beginPath();c.ellipse(mx,y,w,2.5+i*.5,0,0,7);c.fill();}
};
})();
