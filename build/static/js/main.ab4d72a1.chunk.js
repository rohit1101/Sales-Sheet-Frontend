(this["webpackJsonpsales-sheet-frontend"]=this["webpackJsonpsales-sheet-frontend"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(9),o=n.n(r),l=(n(14),n(4)),s=n(2),i=n(6),d=n(3);function u(e,t){var n=new URL("http://107.22.18.203/sales/".concat(e));return fetch(n,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"PUT",body:JSON.stringify(t)}).then((function(e){return e.text()})).then((function(e){return e})).catch((function(e){return console.log("Error:",e)}))}function b(e){if("object"===typeof e){var t=new URL("http://107.22.18.203/filter?start=".concat(e.startDate,"&end=").concat(e.endDate));return fetch(t).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){return console.log("ERROR while filtering sales FE:",e)}))}var n=new URL("http://107.22.18.203/filter?by=".concat(e));return fetch(n).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){return console.log("ERROR while filtering sales FE:",e)}))}var j=n(0),p=function(e){var t=e.sale,n=e.setSalesEntries,c=e.salesEntries,r=Object(a.useState)(!1),o=Object(d.a)(r,2),b=o[0],p=o[1],h=Object(a.useState)({date:!1,amount_paid:!1,description:!1}),m=Object(d.a)(h,2),O=m[0],x=m[1],g=Object(a.useState)({income:parseFloat(t.amount_paid)>0,expense:parseFloat(t.amount_paid)<0}),f=Object(d.a)(g,2),v=f[0],y=f[1],N=Object(a.useState)({date:new Date(t.date).toLocaleDateString().split("/").reverse().join("-"),amount_paid:t.amount_paid,description:t.description}),_=Object(d.a)(N,2),k=_[0],S=_[1];function w(e){(function(e){var t=new URL("http://107.22.18.203/sales/".concat(e));return fetch(t,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE"}).then((function(e){return e.text()})).then((function(e){return e})).catch((function(e){return console.log("Error:",e)}))})(e).then((function(e){return console.log(e)}));var t=Object(i.a)(c).filter((function(t){return t.id!==e}));n(t)}function D(e){y(Object(s.a)(Object(s.a)({},v),{},Object(l.a)({},e.target.name,e.target.checked)))}return Object(j.jsx)(j.Fragment,{children:b?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("label",{className:"block",children:"date"}),Object(j.jsx)("input",{type:"date",value:k.date,onChange:function(e){x(Object(s.a)(Object(s.a)({},O),{},{date:!0}));var t=e.target.value.split("/").reverse().join("-");S(Object(s.a)(Object(s.a)({},k),{},{date:t}))}}),Object(j.jsx)("div",{className:"block my-2"}),Object(j.jsxs)("label",{className:"px-2 ",children:[Object(j.jsx)("input",{type:"checkbox",name:"income",checked:v.income,onChange:D})," ","Income"]}),Object(j.jsxs)("label",{className:"px-2",children:[Object(j.jsx)("input",{type:"checkbox",name:"expense",checked:v.expense,onChange:D})," ","Expense"]}),Object(j.jsx)("label",{className:"block",children:"Amount"}),Object(j.jsx)("input",{type:"text",value:k.amount_paid,onChange:function(e){x(Object(s.a)(Object(s.a)({},O),{},{amount_paid:!0}));var t=e.target.value;S(Object(s.a)(Object(s.a)({},k),{},{amount_paid:t}))}}),v.expense?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("label",{className:"block",children:"Description"}),Object(j.jsx)("input",{className:"block mb-2",type:"text",value:k.description,onChange:function(e){S(Object(s.a)(Object(s.a)({},k),{},{description:e.target.value})),x(Object(s.a)(Object(s.a)({},O),{},{description:!0}))}})]}):null,Object(j.jsx)("button",{onClick:function(){p(!1),x({amount_paid:!1,date:!1,description:!1}),y({income:!1,expense:!1})},className:"block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl",children:"Cancel"}),Object(j.jsx)("button",{onClick:function(){!function(e){var t=O.date,a=O.amount_paid,r=O.description,o=Object(i.a)(c).map((function(n){return n.id===e&&t&&a&&r?(n.date=k.date,n.amount_paid=k.amount_paid,n.description=k.description,u(e,{date:k.date,amount_paid:k.amount_paid,description:k.description}).then((function(e){return console.log(e)})),console.log("FE: inside both")):n.id===e&&t&&a?(n.date=k.date,n.amount_paid=k.amount_paid,parseFloat(k.amount_paid)>0?n.description="NIL":n.description=k.description,u(e,{date:k.date,amount_paid:k.amount_paid,description:n.description}).then((function(e){return console.log(e)})),console.log("FE: inside both")):n.id===e&&a&&r?(n.amount_paid=k.amount_paid,parseFloat(k.amount_paid)>0?n.description="NIL":n.description=k.description,u(e,{amount_paid:k.amount_paid,description:n.description}).then((function(e){return console.log(e)})),console.log("FE: inside both")):n.id===e&&t&&r?(n.date=k.date,n.description=k.description,u(e,{date:k.date,description:k.description}).then((function(e){return console.log(e)})),console.log("FE: inside both")):n.id===e&&a?(n.amount_paid=k.amount_paid,parseFloat(k.amount_paid)>0?n.description="NIL":n.description=k.description,u(e,{amount_paid:k.amount_paid,description:n.description}).then((function(e){return console.log(e)})),console.log("FE: inside amount")):n.id===e&&t?(n.date=k.date,u(e,{date:k.date}).then((function(e){return console.log(e)})),console.log("FE: inside date")):n.id===e&&r&&(n.description=k.description,u(e,{description:k.description}).then((function(e){return console.log(e)})),console.log("FE: inside description")),n}));console.log(o),x({amount_paid:!1,date:!1,description:!1}),n(o),p(!1)}(t.id)},className:O.date||O.amount_paid||O.description?"block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl":"opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl",children:"Save Changes"})]}):Object(j.jsxs)("tr",{className:"bg-yellow-200",children:[Object(j.jsx)("td",{className:"border border-green-600",children:t.card_id}),Object(j.jsx)("td",{className:"border border-green-600",children:t.date?new Date(t.date).toLocaleString():(new Date).toLocaleString()}),Object(j.jsx)("td",{className:"border border-green-600",children:t.amount_paid}),Object(j.jsx)("td",{onClick:function(){return w(t.id)},style:{cursor:"pointer"},children:"\u2715"}),Object(j.jsx)("td",{onClick:function(){return p(!0)},style:{cursor:"pointer"},children:"\u270d"})]})})},h=function(e){var t=e.sales,n=e.setSalesEntries,a=e.salesEntries;return Object(j.jsx)(j.Fragment,{children:t&&Object(j.jsxs)("table",{className:"w-full my-2 table-auto bg-green-200 border-collapse border-2 border-green-800",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{className:"border border-green-600",children:"Card ID"}),Object(j.jsx)("th",{className:"border border-green-600",children:"Date"}),Object(j.jsx)("th",{className:"border border-green-600",children:"Amount"}),Object(j.jsx)("th",{className:"border border-green-600",children:"Delete"}),Object(j.jsx)("th",{className:"border border-green-600",children:"Edit"})]})}),Object(j.jsx)("tbody",{children:t.length?t.map((function(e){return Object(j.jsx)(p,{sale:e,setSalesEntries:n,salesEntries:a},e.id)})):Object(j.jsx)("tr",{children:Object(j.jsx)("td",{className:"text-center",children:"No sales"})})})]})})},m=function(e){var t=e.filterData;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("table",{className:"table-auto w-full text-center bg-gray-100",children:[Object(j.jsx)("thead",{className:"bg-gray-300",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Card Number"}),Object(j.jsx)("th",{children:"Total Sales (in Rs.)"})]})}),Object(j.jsx)("tbody",{children:Boolean(t.length)?t.map((function(e){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.card_id}),Object(j.jsx)("td",{children:e.sum})]})})):"loading.."})]})})},O=function(e){var t=e.filterData;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("table",{className:"table-auto w-full text-center bg-gray-100",children:[Object(j.jsx)("thead",{className:"bg-gray-300",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Date"}),Object(j.jsx)("th",{children:"Total Sales (in Rs.)"})]})}),Object(j.jsx)("tbody",{children:Boolean(t.length)?t.map((function(e){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:new Date(e.date).toLocaleDateString()}),Object(j.jsxs)("td",{children:["$ ",e.sum]})]})})):"loading.."})]})})},x=function(e){var t=e.filterData;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("table",{className:"table-auto w-full text-center bg-gray-100",children:[Object(j.jsx)("thead",{className:"bg-gray-300",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Card Number"}),Object(j.jsx)("th",{children:"Date"}),Object(j.jsx)("th",{children:"Total Sales (in Rs.)"}),Object(j.jsx)("th",{children:"Description"})]})}),Object(j.jsx)("tbody",{children:Boolean(t.length)?t.map((function(e){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:e.card_id}),Object(j.jsx)("td",{children:new Date(e.date).toLocaleDateString()}),Object(j.jsx)("td",{children:e.amount_paid}),Object(j.jsx)("td",{children:e.description})]})})):"loading.."})]})})};var g=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(),o=Object(d.a)(r,2),u=o[0],p=o[1],g=Object(a.useState)(),f=Object(d.a)(g,2),v=f[0],y=f[1],N=Object(a.useState)(),_=Object(d.a)(N,2),k=_[0],S=_[1],w=Object(a.useState)({income:!1,expense:!1}),D=Object(d.a)(w,2),E=D[0],C=D[1],F=Object(a.useState)(""),L=Object(d.a)(F,2),R=L[0],T=L[1],I=Object(a.useState)(""),A=Object(d.a)(I,2),U=A[0],B=A[1],J=Object(a.useState)([]),P=Object(d.a)(J,2),G=P[0],M=P[1],H=Object(a.useState)({startDate:"",endDate:""}),$=Object(d.a)(H,2),q=$[0],z=$[1];function K(e){C(Object(s.a)(Object(s.a)({},E),{},Object(l.a)({},e.target.name,e.target.checked)))}function Q(e){b(e).then((function(e){return M(e)})).catch((function(e){return console.log("Error e",e)}))}var V=E.income?u&&k&&E.income:u&&k&&E.expense&&R;return Object(j.jsx)("div",{className:"h-full bg-blue-100",children:Object(j.jsxs)("div",{className:"w-full max-w-screen-md mx-auto rounded-sm shadow-xl h-full",children:[Object(j.jsx)("h1",{className:"font-sans text-2xl font-medium text-gray-500 text-center",children:"Sales Summary"}),Object(j.jsx)("label",{className:"block",children:"Card Id"}),Object(j.jsx)("input",{type:"text",value:u,onChange:function(e){return p(e.target.value)}}),Object(j.jsx)("label",{className:"block",children:"Date"}),Object(j.jsx)("input",{className:"block mb-2",type:"date",value:v,onChange:function(e){return y(e.target.value.split("/").reverse().join("-"))}}),Object(j.jsxs)("label",{className:"px-2",children:[Object(j.jsx)("input",{type:"checkbox",name:"income",checked:E.income,onChange:K})," ","Income"]}),Object(j.jsxs)("label",{className:"px-2",children:[Object(j.jsx)("input",{type:"checkbox",name:"expense",checked:E.expense,onChange:K})," ","Expense"]}),Object(j.jsx)("label",{className:"block",children:"Amount"}),Object(j.jsx)("input",{className:"block mb-2",type:"number",value:k,onChange:function(e){return S(e.target.value)}}),E.expense?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("label",{className:"block",children:"Description"}),Object(j.jsx)("input",{className:"block mb-2",type:"text",value:R,onChange:function(e){return T(e.target.value)}})]}):null,Object(j.jsx)("button",{onClick:function(){(function(e,t){var n=new URL("http://107.22.18.203/sales"),a={cardId:e,date:t};return Object.keys(a).forEach((function(e){a[e]&&n.searchParams.append(e,a[e])})),fetch(n).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){return console.log("Error:",e)}))})(u,v).then((function(e){return c(e)})).catch((function(e){return console.log("From App.js METHOD = GET: ",e)})),p(""),y(""),C({income:!1,expense:!1})},className:"min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl",children:u||v?"Get Sales Summary":"Get All Sales Summary"}),Object(j.jsx)("button",{onClick:function(){(function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",c=arguments.length>4?arguments[4]:void 0,r=new URL("http://107.22.18.203/sale");return fetch(r,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:Boolean(a)?JSON.stringify({card_id:e,sales_rep_id:t,date:a,amount_paid:n,description:c}):JSON.stringify({card_id:e,sales_rep_id:t,amount_paid:n,description:c})}).then((function(e){return e.json()})).then((function(e){return console.log(e),e})).catch((function(e){return console.log("Error:",e)}))})(u,1,E.income?k:"-".concat(k),v,R||"NIL").then((function(e){console.log(e),c([].concat(Object(i.a)(n),[e]))})).catch((function(e){return console.log("From App.js METHOD = POST",e)})),p(""),y(""),S(""),C({income:!1,expense:!1}),T("")},disabled:!V,className:V?"block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl":"cursor-not-allowed opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl",children:"Add Sales Entry"}),Object(j.jsxs)("label",{className:"block",children:[Object(j.jsx)("span",{className:"block",children:"Filter Sales"}),Object(j.jsxs)("select",{value:U,onChange:function(e){"date"===e.target.value||"card_id"===e.target.value?(B(e.target.value),Q(e.target.value)):("date_range"===e.target.value||"Choose Filter"===e.target.value)&&B(e.target.value)},children:[Object(j.jsx)("option",{value:"Choose Filter",name:"Choose Filter",children:"Choose Filter"}),Object(j.jsx)("option",{value:"date",children:"Filter by day"}),Object(j.jsx)("option",{value:"card_id",children:"Filter by card ID"}),Object(j.jsx)("option",{value:"date_range",children:"Filter by date range"})]})]}),"date_range"===U?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("label",{className:"block",children:"Start Date"}),Object(j.jsx)("input",{className:"block mb-2",type:"date",value:q.startDate,name:"startDate",onChange:function(e){return z(Object(s.a)(Object(s.a)({},q),{},Object(l.a)({},e.target.name,e.target.value)))}}),Object(j.jsx)("label",{className:"block",children:"End Date"}),Object(j.jsx)("input",{className:"block mb-2",type:"date",value:q.endDate,name:"endDate",onChange:function(e){return z(Object(s.a)(Object(s.a)({},q),{},Object(l.a)({},e.target.name,e.target.value)))}}),Object(j.jsx)("button",{className:"block p-2 bg-yellow-100 text-yellow-600  rounded-md px-2 py-1 shadow-2xl",onClick:function(){2===Object.values(q).length&&(Q(q),z({startDate:"",endDate:""}))},children:"Submit"})]}):null,"date"===U?Object(j.jsx)(O,{filterData:G}):null,"card_id"===U?Object(j.jsx)(m,{filterData:G}):null,"date_range"===U&&2===Object.values(q).length?Object(j.jsx)(x,{filterData:G}):null,Object(j.jsx)(h,{sales:n,salesEntries:n,setSalesEntries:c})]})})};o.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(g,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.ab4d72a1.chunk.js.map