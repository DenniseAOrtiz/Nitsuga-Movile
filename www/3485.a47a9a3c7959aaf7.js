"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3485],{3485:(L,d,t)=>{t.r(d),t.d(d,{LoginPageModule:()=>v});var c=t(177),u=t(4341),s=t(4742),l=t(1739),p=t(467),e=t(4438),f=t(7772);function F(o,a){1&o&&(e.j41(0,"ion-text",9),e.EFF(1,"Credenciales inv\xe1lidas"),e.k0s())}const h=[{path:"",component:(()=>{var o;class a{constructor(n,i){this.router=n,this.DbService=i,this.username="",this.password="",this.errorMessage=""}register(){var n=this;return(0,p.A)(function*(){const i=yield n.DbService.register(n.username,n.password);console.log(i?"Usuario registrado":"Registro fallido")})()}login(){var n=this;return(0,p.A)(function*(){(yield n.DbService.login(n.username,n.password))?(console.log("Inicio de sesi\xf3n exitoso"),n.router.navigate(["/home"])):n.errorMessage="Invalid username or password"})()}onResetPassword(){this.router.navigate(["/reset-password"])}goToRegister(){console.log("Navegando a registro"),this.router.navigate(["/register"])}}return(o=a).\u0275fac=function(n){return new(n||o)(e.rXU(l.Ix),e.rXU(f.a))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-login"]],decls:26,vars:3,consts:[[1,"ion-padding"],["position","floating"],["type","text",3,"ngModelChange","ngModel"],["type","password",3,"ngModelChange","ngModel"],["color","danger",4,"ngIf"],["expand","block",3,"click"],["lines","none"],["fill","clear","routerLink","/register"],["fill","clear","routerLink","/reset-password"],["color","danger"]],template:function(n,i){1&n&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Iniciar Sesi\xf3n"),e.k0s()()(),e.j41(4,"ion-content",0)(5,"ion-item")(6,"ion-label",1),e.EFF(7,"Nombre de Usuario"),e.k0s(),e.j41(8,"ion-input",2),e.mxI("ngModelChange",function(r){return e.DH7(i.username,r)||(i.username=r),r}),e.k0s()(),e.j41(9,"ion-item")(10,"ion-label",1),e.EFF(11,"Contrase\xf1a"),e.k0s(),e.j41(12,"ion-input",3),e.mxI("ngModelChange",function(r){return e.DH7(i.password,r)||(i.password=r),r}),e.k0s()(),e.DNE(13,F,2,0,"ion-text",4),e.j41(14,"ion-button",5),e.bIt("click",function(){return i.login()}),e.EFF(15,"Iniciar Sesi\xf3n"),e.k0s(),e.j41(16,"ion-item",6)(17,"ion-label"),e.EFF(18,"\xbfNo tienes una cuenta?"),e.k0s(),e.j41(19,"ion-button",7),e.EFF(20,"\xa1Registrate!"),e.k0s()(),e.j41(21,"ion-item",6)(22,"ion-label"),e.EFF(23,"\xbfOlvidaste tu contrase\xf1a?"),e.k0s(),e.j41(24,"ion-button",8),e.EFF(25,"\xa1Recuperala!"),e.k0s()()()),2&n&&(e.R7$(8),e.R50("ngModel",i.username),e.R7$(4),e.R50("ngModel",i.password),e.R7$(),e.Y8G("ngIf",i.errorMessage))},dependencies:[c.bT,u.BC,u.vS,s.Jm,s.W9,s.eU,s.$w,s.uz,s.he,s.IO,s.BC,s.ai,s.Gw,s.N7,l.Wk]}),a})()}];let M=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[l.iI.forChild(h),l.iI]}),a})(),v=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[c.MD,u.YN,s.bv,M]}),a})()}}]);