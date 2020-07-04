// import tokenServices from '../services/token-services.ts';
// import { Context, send } from "../deps.ts";

// function isAuth(context: Context) {
//   console.log(context.request.headers);
//   if (!context.request.headers.get("authorization")) {
//     console.log('Sin cabeceras. No autorizado');
//     context.response.status = 403
//     return context.response.body = {
//       message: 'No tienes autorización'
//     };
//   }
//   // extract 'Bearer' from Auth header
//   const tokenBearer = context.request.headers.get("authorization");
//   let arr = tokenBearer.split(" ");
//   const token = arr[1];
//   tokenServices.decodeToken(token)
//     .then((response: any) => {
//       context.require.user = response;
//       console.log('Tiene acceso');
//       context.response.status = 200
//       return context.response.body = {
//         message: 'Tienes acceso'
//       };
//     })
//     .catch((response: any) => {
//       console.log('No autorizado. Sin acceso');
//       context.response.status = response.status
//       return context.response.body = {
//         message: 'No tienes autorización'
//       };
//     });
// }

// function checkAuth(context: Context) {
//   console.log("");
//   console.log("Comprobando header Authorization");
//     if (!context.request.headers.get("authorization")) {
//       console.log("No existe");
//       context.response.status = 401
//       return context.response.body = {
//         message: 'No tienes autorización'
//       };
//     }
//     // extract 'Bearer' from Auth header
//     const tokenBearer = context.request.headers.get("authorization")
//     let arr = tokenBearer.split(" ");
//     const token = arr[1];
//     tokenServices.decodeToken(token)
//     .then((response: any) => {
//       if (response) {
//         console.log(response);
//         console.log("Está autorizado");
//         context.request.user = response;
//       }
//       else{
//         console.log("No está autorizado");
//       }
//     })
//     .catch((error: any) => {
//       console.log("No está autorizado");
//       console.log(error);
//       context.response.status = 401
//       return context.response.body = {
//         message: 'No tienes autorización'
//       };
//     });
// }

// function checkAdmin(context: Context) {
//   console.log("");
//   console.log("Comprobando header Authorization");
//     if (!context.request.headers.get("authorization")) {
//       console.log("No existe");
//       context.response.status = 401
//       return context.response.body = {
//         message: 'No tienes autorización como administrador'
//       };
//     }
//     // extract 'Bearer' from Auth header
//     const tokenBearer = context.request.headers.get("authorization");
//     let arr = tokenBearer.split(" ");
//     const token = arr[1];
//     tokenServices.decodeToken(token)
//     .then((response: any) => {
//       if (response && response.role == "admin") {
//         console.log(response);
//         console.log("Está autorizado como administrador");
//         context.request.user = response;
//       }
//       else{
//         throw "No está autorizado como administrador";
//       }
//     })
//     .catch((error: any) => {
//       console.log(error);
//       context.response.status = 401
//       return context.response.body = {
//         message: 'No tienes autorización como administrador'
//       };
//     });
// }

// export default{
//   isAuth,
//   checkAuth,
//   checkAdmin
// }
