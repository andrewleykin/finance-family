webpackJsonp([1],{"9M+g":function(t,e){},INmS:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i=n("bOdI"),s=n.n(i),o=n("fZjL"),c=n.n(o),r={name:"App",data:function(){return{authorized:!0,percent:[],finance:[],names:[],money:0,financeDoc:"P0nJ1MFruskYjalwL5Jl",percentDoc:"aQwmNa0nxiXWcKVWpYns",changeValue:null,activeChangeKey:null,activeActions:"minus",activeDocs:"finance",changeValueModal:!1,dismissSecs:2,dismissCountDown:0,alert:{variant:"success",text:"Успешно"},form:{email:"",password:""}}},computed:{allPercentValue:function(){var t=this,e=0;return c()(this.percent[0]).map(function(n){e+=+t.percent[0][n]}),e.toFixed()}},methods:{onSubmit:function(){var t=this,e=this.percent[0],n=this.money/100,a={};c()(this.finance[0]).map(function(i){a[i]=t.finance[0][i]+ +(e[i]*n).toFixed()}),this.setData("finance",this.financeDoc,a)},resetData:function(){var t={};c()(this.finance[0]).map(function(e){t[e]=0}),this.setData("finance",this.financeDoc,t)},changeDataOne:function(){var t=+this.changeValue,e="finance"===this.activeDocs?this.finance[0][this.activeChangeKey]:this.percent[0][this.activeChangeKey],n="new"===this.activeActions?t:"minus"===this.activeActions?e-t:e+t;"finance"===this.activeDocs?this.setData("finance",this.financeDoc,s()({},this.activeChangeKey,n)):this.setData("percent",this.percentDoc,s()({},this.activeChangeKey,n))},setDataOne:function(t,e,n){this.activeActions="new"===e?"new":e?"pluse":"minus",this.activeChangeKey=t,this.activeDocs=n,this.changeValueModal=!0},setData:function(t,e,n){var a=this,i=b.collection(t).doc(e);b.runTransaction(function(t){return t.get(i).then(function(e){if(!e.exists)throw"Document does not exist!";t.update(i,n)})}).then(function(t){a.money=null,a.changeValue=null,a.changeValueModal=!1,a.showAlert(!0)}).catch(function(t){this.showAlert(!1)})},focusMyElement:function(){this.$refs.focusThis.focus()},showAlert:function(t){t?(this.alert.variant="success",this.alert.text="Успешно"):(this.alert.variant="danger",this.alert.text="Ошибка"),this.dismissCountDown=this.dismissSecs},onDismissed:function(){this.dismissCountDown=0},onLogin:function(){var t=this;firebase.auth().signInWithEmailAndPassword(this.form.email,this.form.password).then(function(e){t.authorized=!0}).catch(function(){t.authorized=!1})}},firestore:function(){return{percent:b.collection("percent"),finance:b.collection("finance"),names:b.collection("names")}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.authorized?n("b-container",{attrs:{fluid:""}},[n("h1",[t._v("Финансы")]),t._v(" "),n("b-form",{staticClass:"mb-4",attrs:{action:"#",inline:""},on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("b-input-group",[n("b-form-input",{attrs:{type:"number",placeholder:"Пришли финансы"},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}}),t._v(" "),n("b-input-group-append",[n("b-button",{attrs:{variant:"success",type:"submit"}},[t._v("Добавить")])],1)],1)],1),t._v(" "),n("b-tabs",[n("b-tab",{attrs:{title:"Finance"}},[n("b-list-group",t._l(t.finance[0],function(e,a,i){return n("b-list-group-item",{key:i,staticClass:"d-flex flex-column flex-sm-row align-items-center"},[n("span",[t._v(t._s(t.names[0][a])+" - "+t._s(e)+" руб")]),t._v(" "),n("b-button-group",{staticClass:"ml-4 mt-2 mt-sm-0"},[n("b-button",{on:{click:function(e){return e.preventDefault(),t.setDataOne(a,!1,"finance")}}},[t._v("-")]),t._v(" "),n("b-button",{attrs:{variant:"success"},on:{click:function(e){return e.preventDefault(),t.setDataOne(a,!0,"finance")}}},[t._v("+")]),t._v(" "),n("b-button",{attrs:{variant:"info"},on:{click:function(e){return e.preventDefault(),t.setDataOne(a,"new","finance")}}},[t._v("new")])],1)],1)}),1)],1),t._v(" "),n("b-tab",{attrs:{title:"Percent"}},[n("b-list-group",[n("b-list-group-item",[t._v("Всего процентов - "+t._s(t.allPercentValue))]),t._v(" "),t._l(t.percent[0],function(e,a,i){return n("b-list-group-item",{key:i,staticClass:"d-flex flex-column flex-sm-row align-items-center"},[n("span",[t._v(t._s(t.names[0][a])+" - "+t._s(e)+" %")]),t._v(" "),n("b-button-group",{staticClass:"ml-4 mt-2 mt-sm-0"},[n("b-button",{on:{click:function(e){return e.preventDefault(),t.setDataOne(a,!1,"percent")}}},[t._v("-")]),t._v(" "),n("b-button",{attrs:{variant:"success"},on:{click:function(e){return e.preventDefault(),t.setDataOne(a,!0,"percent")}}},[t._v("+")]),t._v(" "),n("b-button",{attrs:{variant:"info"},on:{click:function(e){return e.preventDefault(),t.setDataOne(a,"new","percent")}}},[t._v("new")])],1)],1)})],2)],1)],1),t._v(" "),n("b-modal",{attrs:{centered:"","hide-header":"","hide-footer":""},on:{shown:t.focusMyElement},model:{value:t.changeValueModal,callback:function(e){t.changeValueModal=e},expression:"changeValueModal"}},[n("b-form",{attrs:{action:"#"},on:{submit:function(e){return e.preventDefault(),t.changeDataOne(e)}}},[n("b-input-group",[n("b-form-input",{ref:"focusThis",attrs:{type:"number",step:"0.01"},model:{value:t.changeValue,callback:function(e){t.changeValue=e},expression:"changeValue"}}),t._v(" "),n("b-input-group-append",[n("b-button",{attrs:{variant:"success",type:"submit"}},[t._v(t._s("new"===t.activeActions?"Новое значение":"minus"===t.activeActions?"Убавить":"Добавить"))])],1)],1)],1)],1),t._v(" "),n("b-alert",{staticClass:"alert",attrs:{fade:"",show:t.dismissCountDown,dismissible:"",variant:t.alert.variant},on:{dismissed:t.onDismissed}},[t._v("\n      "+t._s(t.alert.text)+"\n    ")]),t._v(" "),n("b-button",{staticClass:"mt-4",attrs:{variant:"danger",block:""},on:{click:function(e){return e.preventDefault(),t.resetData(e)}}},[t._v("Очистить данные")])],1):n("b-container",{attrs:{fluid:""}},[n("b-form",{attrs:{action:"#"},on:{submit:function(e){return e.preventDefault(),t.onLogin(e)}}},[n("b-form-group",{attrs:{label:"Email address:","label-for":"exampleInput1"}},[n("b-form-input",{attrs:{id:"exampleInput1",type:"email",required:"",placeholder:"Enter email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"Password:","label-for":"exampleInput2"}},[n("b-form-input",{attrs:{id:"exampleInput2",type:"password",required:"",placeholder:"Enter password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),n("b-button",{attrs:{type:"submit",variant:"success"}},[t._v("Войти")])],1)],1)],1)},staticRenderFns:[]};var l=n("VU/8")(r,u,!1,function(t){n("INmS")},null,null).exports,f=n("hnaQ"),m=n("yviF"),p=n.n(m),h=(n("881v"),n("e6fC")),v=n.n(h);n("Jmt5"),n("9M+g");n.d(e,"db",function(){return b}),a.a.use(f.a),p.a.initializeApp({projectId:"finance-family",databaseURL:"https://finance-family.firebaseio.com/"});var b=p.a.firestore();a.a.use(v.a),a.a.config.productionTip=!1,new a.a({el:"#app",components:{App:l},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.6c23cf3d28a6f87de5af.js.map