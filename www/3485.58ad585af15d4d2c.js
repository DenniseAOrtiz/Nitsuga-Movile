"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3485],{3485:(C,u,r)=>{r.r(u),r.d(u,{LoginPageModule:()=>P});var p=r(177),g=r(4341),o=r(4742),l=r(1739),m=r(467),e=r(4438),f=r(7772);function b(n,a){1&n&&(e.j41(0,"ion-text",13),e.EFF(1,"Credenciales inv\xe1lidas"),e.k0s())}const h=[{path:"",component:(()=>{var n;class a{constructor(t,i){this.router=t,this.dbService=i,this.username="",this.password="",this.errorMessage=""}login(){var t=this;return(0,m.A)(function*(){(yield t.dbService.login(t.username,t.password)).success?t.router.navigate(["/home"]):t.errorMessage="Credenciales inv\xe1lidas"})()}onResetPassword(){this.router.navigate(["/reset-password"])}goToRegister(){console.log("Navegando a registro"),this.router.navigate(["/register"])}}return(n=a).\u0275fac=function(t){return new(t||n)(e.rXU(l.Ix),e.rXU(f.a))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-login"]],decls:28,vars:3,consts:[[1,"ion-padding","centered-page"],[1,"animated-border-card","centered-content"],["src","../assets/img/Logo/logonitsuga.png","alt","Logo",1,"logo-img"],[1,"ion-text-center"],[3,"submit"],["position","floating"],["type","text",3,"ngModelChange","ngModel"],["type","password",3,"ngModelChange","ngModel"],["color","danger",4,"ngIf"],["expand","block",3,"click"],["expand","block","color","light","routerLink","/register"],["lines","none"],["expand","full","fill","clear","color","dark","routerLink","/reset-password"],["color","danger"]],template:function(t,i){1&t&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Iniciar Sesi\xf3n"),e.k0s()()(),e.j41(4,"ion-content",0)(5,"ion-card",1),e.nrm(6,"img",2),e.j41(7,"ion-card-header")(8,"ion-card-title",3),e.EFF(9," Accede a tu cuenta"),e.k0s()(),e.j41(10,"ion-card-content")(11,"form",4),e.bIt("submit",function(){return i.login()}),e.j41(12,"ion-item")(13,"ion-label",5),e.EFF(14,"Nombre de Usuario"),e.k0s(),e.j41(15,"ion-input",6),e.mxI("ngModelChange",function(s){return e.DH7(i.username,s)||(i.username=s),s}),e.k0s()(),e.j41(16,"ion-item")(17,"ion-label",5),e.EFF(18,"Contrase\xf1a"),e.k0s(),e.j41(19,"ion-input",7),e.mxI("ngModelChange",function(s){return e.DH7(i.password,s)||(i.password=s),s}),e.k0s()(),e.DNE(20,b,2,0,"ion-text",8),e.j41(21,"ion-button",9),e.bIt("click",function(){return i.login()}),e.EFF(22,"Iniciar Sesi\xf3n"),e.k0s(),e.j41(23,"ion-button",10),e.EFF(24,"\xa1Registrate aqu\xed!"),e.k0s(),e.j41(25,"ion-item",11)(26,"ion-button",12),e.EFF(27,"\xbfOlvidaste tu contrase\xf1a?"),e.k0s()()()()()()),2&t&&(e.R7$(15),e.R50("ngModel",i.username),e.R7$(4),e.R50("ngModel",i.password),e.R7$(),e.Y8G("ngIf",i.errorMessage))},dependencies:[p.bT,g.qT,g.BC,g.cb,g.vS,g.cV,o.Jm,o.b_,o.I9,o.ME,o.tN,o.W9,o.eU,o.$w,o.uz,o.he,o.IO,o.BC,o.ai,o.Gw,o.N7,l.Wk],styles:['@charset "UTF-8";.centered-page[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.logo-img[_ngcontent-%COMP%]{display:block;margin:0 auto 20px;width:50%;height:50%}ion-card-content[_ngcontent-%COMP%]{width:100%;max-width:400px;box-shadow:0 4px 8px #0000001a;border-radius:20px;padding:20px}ion-input[_ngcontent-%COMP%]{border-color:#000;border-radius:10px}ion-card-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700}ion-item[_ngcontent-%COMP%]{margin-bottom:15px}ion-button[_ngcontent-%COMP%]{margin-top:20px}.animated-border-card[_ngcontent-%COMP%]{position:relative;padding:20px;background-color:#fff;border-radius:20px;z-index:1}.animated-border-card[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:20px;border:4px solid transparent;background-clip:padding-box;z-index:-1;animation:_ngcontent-%COMP%_rotateBorder 5s linear infinite;transition:border-color .5s}@keyframes _ngcontent-%COMP%_rotateBorder{0%{border-color:#df3fff}25%{border-color:#ff00c8}50%{border-color:#4feafe}75%{border-color:#35cbd3}to{border-color:#ff0ca2}}']}),a})()}];let M=(()=>{var n;class a{}return(n=a).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[l.iI.forChild(h),l.iI]}),a})(),P=(()=>{var n;class a{}return(n=a).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[p.MD,g.YN,o.bv,M]}),a})()}}]);