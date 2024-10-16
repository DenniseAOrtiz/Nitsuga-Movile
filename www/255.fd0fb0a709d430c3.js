"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[255],{255:(M,s,u)=>{u.r(s),u.d(s,{AdminPageModule:()=>C});var g=u(177),m=u(4341),a=u(4742),p=u(1739),l=u(467),o=u(4438),_=u(5683);function P(i,c){if(1&i){const t=o.RV6();o.j41(0,"ion-item"),o.EFF(1),o.j41(2,"ion-button",2),o.bIt("click",function(){const n=o.eBV(t).$implicit,d=o.XpG();return o.Njj(d.categoriaEdicion={id:n.id,nombre:n.nombre})}),o.EFF(3,"Editar"),o.k0s(),o.j41(4,"ion-button",2),o.bIt("click",function(){const n=o.eBV(t).$implicit,d=o.XpG();return o.Njj(d.eliminarCategoria(n.id))}),o.EFF(5,"Eliminar"),o.k0s()()}if(2&i){const t=c.$implicit;o.R7$(),o.SpI(" ",t.nombre," ")}}function v(i,c){if(1&i){const t=o.RV6();o.j41(0,"ion-item"),o.nrm(1,"img",8),o.EFF(2),o.nI1(3,"currency"),o.j41(4,"ion-button",2),o.bIt("click",function(){const n=o.eBV(t).$implicit,d=o.XpG();return o.Njj(d.productoEdicion={id:n.id,nombre:n.nombre,precio:n.precio,imagen:n.imagen})}),o.EFF(5,"Editar"),o.k0s(),o.j41(6,"ion-button",2),o.bIt("click",function(){const n=o.eBV(t).$implicit,d=o.XpG();return o.Njj(d.eliminarProducto(n.id))}),o.EFF(7,"Eliminar"),o.k0s()()}if(2&i){const t=c.$implicit;o.R7$(),o.FS9("alt",t.nombre),o.Y8G("src",t.imagen,o.B4B),o.R7$(),o.Lme(" ",t.nombre," - ",o.bMT(3,4,t.precio)," ")}}function h(i,c){if(1&i&&(o.j41(0,"ion-select-option",9),o.EFF(1),o.k0s()),2&i){const t=c.$implicit;o.Y8G("value",t.id),o.R7$(),o.JRh(t.nombre)}}const f=[{path:"",component:(()=>{var i;class c{constructor(e){this.prodService=e,this.categorias=[],this.productos=[],this.nuevaCategoria="",this.nuevoProductoNombre="",this.nuevoProductoPrecio=null,this.nuevoProductoImagen="",this.categoriaSeleccionada=null,this.categoriaEdicion=null,this.productoEdicion=null}ngOnInit(){var e=this;return(0,l.A)(function*(){e.categorias=yield e.prodService.getCategorias(),e.productos=yield e.prodService.getProductos()})()}agregarCategoria(){var e=this;return(0,l.A)(function*(){yield e.prodService.addCategoria(e.nuevaCategoria),e.nuevaCategoria="",e.categorias=yield e.prodService.getCategorias()})()}agregarProducto(){var e=this;return(0,l.A)(function*(){e.nuevoProductoNombre&&null!==e.nuevoProductoPrecio&&null!==e.categoriaSeleccionada&&e.nuevoProductoImagen&&(yield e.prodService.addProducto(e.nuevoProductoNombre,e.nuevoProductoPrecio,e.categoriaSeleccionada,e.nuevoProductoImagen),e.nuevoProductoNombre="",e.nuevoProductoPrecio=null,e.nuevoProductoImagen="",e.categoriaSeleccionada=null,e.productos=yield e.prodService.getProductos())})()}modificarProducto(){var e=this;return(0,l.A)(function*(){e.productoEdicion&&(yield e.prodService.updateProducto(e.productoEdicion.id,e.productoEdicion.nombre,e.productoEdicion.precio,e.productoEdicion.imagen),e.productoEdicion=null,e.productos=yield e.prodService.getProductos())})()}eliminarCategoria(e){var n=this;return(0,l.A)(function*(){yield n.prodService.deleteCategoria(e),n.categorias=yield n.prodService.getCategorias()})()}eliminarProducto(e){var n=this;return(0,l.A)(function*(){yield n.prodService.deleteProducto(e),n.productos=yield n.prodService.getProductos()})()}}return(i=c).\u0275fac=function(e){return new(e||i)(o.rXU(_.t))},i.\u0275cmp=o.VBU({type:i,selectors:[["app-admin"]],decls:19,vars:8,consts:[[4,"ngFor","ngForOf"],["placeholder","Nueva categor\xeda",3,"ngModelChange","ngModel"],[3,"click"],["placeholder","Nombre del producto",3,"ngModelChange","ngModel"],["placeholder","Precio del producto","type","number",3,"ngModelChange","ngModel"],["placeholder","URL de la imagen",3,"ngModelChange","ngModel"],["placeholder","Seleccionar categor\xeda",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],[2,"width","50px","height","50px",3,"src","alt"],[3,"value"]],template:function(e,n){1&e&&(o.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o.EFF(3,"Administraci\xf3n"),o.k0s()()(),o.j41(4,"ion-content")(5,"ion-list"),o.DNE(6,P,6,1,"ion-item",0),o.k0s(),o.j41(7,"ion-input",1),o.mxI("ngModelChange",function(r){return o.DH7(n.nuevaCategoria,r)||(n.nuevaCategoria=r),r}),o.k0s(),o.j41(8,"ion-button",2),o.bIt("click",function(){return n.agregarCategoria()}),o.EFF(9,"Agregar Categor\xeda"),o.k0s(),o.j41(10,"ion-list"),o.DNE(11,v,8,6,"ion-item",0),o.k0s(),o.j41(12,"ion-input",3),o.mxI("ngModelChange",function(r){return o.DH7(n.nuevoProductoNombre,r)||(n.nuevoProductoNombre=r),r}),o.k0s(),o.j41(13,"ion-input",4),o.mxI("ngModelChange",function(r){return o.DH7(n.nuevoProductoPrecio,r)||(n.nuevoProductoPrecio=r),r}),o.k0s(),o.j41(14,"ion-input",5),o.mxI("ngModelChange",function(r){return o.DH7(n.nuevoProductoImagen,r)||(n.nuevoProductoImagen=r),r}),o.k0s(),o.j41(15,"ion-select",6),o.mxI("ngModelChange",function(r){return o.DH7(n.categoriaSeleccionada,r)||(n.categoriaSeleccionada=r),r}),o.DNE(16,h,2,2,"ion-select-option",7),o.k0s(),o.j41(17,"ion-button",2),o.bIt("click",function(){return n.agregarProducto()}),o.EFF(18,"Agregar Producto"),o.k0s()()),2&e&&(o.R7$(6),o.Y8G("ngForOf",n.categorias),o.R7$(),o.R50("ngModel",n.nuevaCategoria),o.R7$(4),o.Y8G("ngForOf",n.productos),o.R7$(),o.R50("ngModel",n.nuevoProductoNombre),o.R7$(),o.R50("ngModel",n.nuevoProductoPrecio),o.R7$(),o.R50("ngModel",n.nuevoProductoImagen),o.R7$(),o.R50("ngModel",n.categoriaSeleccionada),o.R7$(),o.Y8G("ngForOf",n.categorias))},dependencies:[g.Sq,m.BC,m.vS,a.Jm,a.W9,a.eU,a.$w,a.uz,a.nf,a.Nm,a.Ip,a.BC,a.ai,a.su,a.Je,a.Gw,g.oe]}),c})()}];let A=(()=>{var i;class c{}return(i=c).\u0275fac=function(e){return new(e||i)},i.\u0275mod=o.$C({type:i}),i.\u0275inj=o.G2t({imports:[p.iI.forChild(f),p.iI]}),c})(),C=(()=>{var i;class c{}return(i=c).\u0275fac=function(e){return new(e||i)},i.\u0275mod=o.$C({type:i}),i.\u0275inj=o.G2t({imports:[g.MD,m.YN,a.bv,A]}),c})()}}]);