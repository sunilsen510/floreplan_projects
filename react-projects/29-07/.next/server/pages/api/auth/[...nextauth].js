"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src\\pages\\api\\auth\\[...nextauth].ts */ \"(api)/./src/pages/api/auth/[...nextauth].ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__]);\n_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/auth/[...nextauth]\",\n        pathname: \"/api/auth/[...nextauth]\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _src_pages_api_auth_nextauth_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCZwcmVmZXJyZWRSZWdpb249JmFic29sdXRlUGFnZVBhdGg9LiUyRnNyYyU1Q3BhZ2VzJTVDYXBpJTVDYXV0aCU1QyU1Qi4uLm5leHRhdXRoJTVELnRzJm1pZGRsZXdhcmVDb25maWdCYXNlNjQ9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNMO0FBQzFEO0FBQ3NFO0FBQ3RFO0FBQ0EsaUVBQWUsd0VBQUssQ0FBQyw0REFBUSxZQUFZLEVBQUM7QUFDMUM7QUFDTyxlQUFlLHdFQUFLLENBQUMsNERBQVE7QUFDcEM7QUFDTyx3QkFBd0IsZ0hBQW1CO0FBQ2xEO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELHFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktYXBwLz8xYmVhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiLi9zcmNcXFxccGFnZXNcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXS50c1wiO1xuLy8gUmUtZXhwb3J0IHRoZSBoYW5kbGVyIChzaG91bGQgYmUgdGhlIGRlZmF1bHQgZXhwb3J0KS5cbmV4cG9ydCBkZWZhdWx0IGhvaXN0KHVzZXJsYW5kLCBcImRlZmF1bHRcIik7XG4vLyBSZS1leHBvcnQgY29uZmlnLlxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCBcImNvbmZpZ1wiKTtcbi8vIENyZWF0ZSBhbmQgZXhwb3J0IHRoZSByb3V0ZSBtb2R1bGUgdGhhdCB3aWxsIGJlIGNvbnN1bWVkLlxuZXhwb3J0IGNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IFBhZ2VzQVBJUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLlBBR0VTX0FQSSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcIlwiXG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLWFwaS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...nextauth].ts":
/*!*********************************************!*\
  !*** ./src/pages/api/auth/[...nextauth].ts ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// [...nextauth].ts\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Credentials\",\n            credentials: {\n                user_email: {\n                    label: \"Email\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            authorize: async (credentials)=>{\n                const apiUrl = \"https://floorplan.hipl-staging3.com/api\";\n                if (!credentials?.user_email) {\n                    const email_error = JSON.stringify({\n                        \"user_email\": [\n                            \"The email field is required.\"\n                        ]\n                    });\n                    throw new Error(email_error);\n                }\n                try {\n                    const res = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(`${apiUrl}/login`, {\n                        user_email: credentials.user_email,\n                        password: credentials.password\n                    });\n                    const user = res.data;\n                    if (user && user.status && user.data) {\n                        return {\n                            ...user.user,\n                            token: user.access_token,\n                            email: user.user_email,\n                            login_user_data: user.data\n                        }; // Return user object along with token\n                    } else {\n                        const email_error = JSON.stringify({\n                            \"form_error\": [\n                                \"An error occurred during login. Try again!\"\n                            ]\n                        });\n                        throw new Error(email_error);\n                    }\n                } catch (error) {\n                    const form_error = JSON.stringify({\n                        \"form_error\": [\n                            \"An error occurred during login. Try again!\"\n                        ]\n                    });\n                    // throw new Error(JSON.stringify(error.response?.data?.errors) || form_error); \n                    const errorData = error.response?.data;\n                    const errors = errorData?.errors;\n                    const errorMessage = errorData?.error?.message;\n                    const errorToThrow = errors ? JSON.stringify(errors) : errorMessage ? JSON.stringify({\n                        \"password\": [\n                            errorMessage\n                        ]\n                    }) : form_error;\n                    throw new Error(errorToThrow);\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            // If the user object exists, update the token with user info\n            if (user) {\n                token.user = user;\n            }\n            console.log(\"JWT Callback - Token:\", token);\n            return token;\n        },\n        async session ({ session, token }) {\n            // Ensure the session object is updated with the token information\n            if (token?.user) {\n                session = token;\n            }\n            console.log(\"Session Callback - Session:\");\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        signOut: \"/login\" // Add this line to specify the custom sign-out page\n    }\n}));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQkFBbUI7QUFDYztBQUNpQztBQUN4QztBQUUxQixpRUFBZUEsZ0RBQVFBLENBQUM7SUFDdEJHLFdBQVc7UUFDVEYsc0VBQW1CQSxDQUFDO1lBQ2xCRyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFlBQVk7b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQU87Z0JBQzNDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0FFLFdBQVcsT0FBT0w7Z0JBQ2hCLE1BQU1NLFNBQVNDLHlDQUErQjtnQkFDOUMsSUFBSSxDQUFDUCxhQUFhQyxZQUFZO29CQUM1QixNQUFNUyxjQUFjQyxLQUFLQyxTQUFTLENBQUU7d0JBQUMsY0FBYzs0QkFBQzt5QkFBK0I7b0JBQUE7b0JBQ25GLE1BQU0sSUFBSUMsTUFBTUg7Z0JBQ2xCO2dCQUNBLElBQUk7b0JBQ0YsTUFBTUksTUFBTSxNQUFNakIsa0RBQVUsQ0FBQyxDQUFDLEVBQUVTLE9BQU8sTUFBTSxDQUFDLEVBQUU7d0JBQzlDTCxZQUFZRCxZQUFZQyxVQUFVO3dCQUNsQ0csVUFBVUosWUFBWUksUUFBUTtvQkFDaEM7b0JBQ0MsTUFBTVksT0FBT0YsSUFBSUcsSUFBSTtvQkFDdEIsSUFBSUQsUUFBUUEsS0FBS0UsTUFBTSxJQUFJRixLQUFLQyxJQUFJLEVBQUU7d0JBQ3BDLE9BQU87NEJBQUUsR0FBR0QsS0FBS0EsSUFBSTs0QkFBRUcsT0FBT0gsS0FBS0ksWUFBWTs0QkFBQ0MsT0FBTUwsS0FBS2YsVUFBVTs0QkFBRXFCLGlCQUFnQk4sS0FBS0MsSUFBSTt3QkFBQyxHQUFHLHNDQUFzQztvQkFDNUksT0FBTzt3QkFDTCxNQUFNUCxjQUFjQyxLQUFLQyxTQUFTLENBQUU7NEJBQUMsY0FBYztnQ0FBQzs2QkFBNkM7d0JBQUE7d0JBQ2pHLE1BQU0sSUFBSUMsTUFBTUg7b0JBQ2xCO2dCQUNGLEVBQUUsT0FBT2EsT0FBVztvQkFDbEIsTUFBTUMsYUFBYWIsS0FBS0MsU0FBUyxDQUFFO3dCQUFDLGNBQWM7NEJBQUM7eUJBQTZDO29CQUFBO29CQUNoRyxnRkFBZ0Y7b0JBQ2hGLE1BQU1hLFlBQVlGLE1BQU1HLFFBQVEsRUFBRVQ7b0JBQ2xDLE1BQU1VLFNBQVNGLFdBQVdFO29CQUMxQixNQUFNQyxlQUFlSCxXQUFXRixPQUFPTTtvQkFDdkMsTUFBTUMsZUFBZUgsU0FBU2hCLEtBQUtDLFNBQVMsQ0FBQ2UsVUFBV0MsZUFBZWpCLEtBQUtDLFNBQVMsQ0FBQzt3QkFBQyxZQUFZOzRCQUFDZ0I7eUJBQWE7b0JBQUEsS0FBS0o7b0JBQ3RILE1BQU0sSUFBSVgsTUFBTWlCO2dCQUNsQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7UUFDVkMsUUFBUSxLQUFLLEtBQUssS0FBSztJQUN6QjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFaEIsS0FBSyxFQUFFSCxJQUFJLEVBQUU7WUFDdkIsNkRBQTZEO1lBQzdELElBQUlBLE1BQU07Z0JBQ1JHLE1BQU1ILElBQUksR0FBR0E7WUFDZjtZQUNBb0IsUUFBUUMsR0FBRyxDQUFDLHlCQUF5QmxCO1lBQ3JDLE9BQU9BO1FBQ1Q7UUFDQSxNQUFNWSxTQUFRLEVBQUVBLE9BQU8sRUFBRVosS0FBSyxFQUFNO1lBQ2xDLGtFQUFrRTtZQUNsRSxJQUFJQSxPQUFPSCxNQUFNO2dCQUNmZSxVQUFVWjtZQUNaO1lBQ0FpQixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPTjtRQUNUO0lBQ0Y7SUFDQU8sT0FBTztRQUNMQyxRQUFRO1FBQ1JDLFNBQVMsU0FBUyxvREFBb0Q7SUFDeEU7QUFDRixFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz81MGExIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFsuLi5uZXh0YXV0aF0udHNcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoe1xyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgdXNlcl9lbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcInRleHRcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGF1dGhvcml6ZTogYXN5bmMgKGNyZWRlbnRpYWxzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXBpVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTDtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy51c2VyX2VtYWlsKSB7XHJcbiAgICAgICAgICBjb25zdCBlbWFpbF9lcnJvciA9IEpTT04uc3RyaW5naWZ5KCB7XCJ1c2VyX2VtYWlsXCI6IFtcIlRoZSBlbWFpbCBmaWVsZCBpcyByZXF1aXJlZC5cIl19KVxyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVtYWlsX2Vycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLnBvc3QoYCR7YXBpVXJsfS9sb2dpbmAsIHtcclxuICAgICAgICAgICAgdXNlcl9lbWFpbDogY3JlZGVudGlhbHMudXNlcl9lbWFpbCxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxyXG4gICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgIGNvbnN0IHVzZXIgPSByZXMuZGF0YTtcclxuICAgICAgICAgIGlmICh1c2VyICYmIHVzZXIuc3RhdHVzICYmIHVzZXIuZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyAuLi51c2VyLnVzZXIsIHRva2VuOiB1c2VyLmFjY2Vzc190b2tlbixlbWFpbDp1c2VyLnVzZXJfZW1haWwsIGxvZ2luX3VzZXJfZGF0YTp1c2VyLmRhdGEgfTsgLy8gUmV0dXJuIHVzZXIgb2JqZWN0IGFsb25nIHdpdGggdG9rZW5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsX2Vycm9yID0gSlNPTi5zdHJpbmdpZnkoIHtcImZvcm1fZXJyb3JcIjogW1wiQW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGxvZ2luLiBUcnkgYWdhaW4hXCJdfSlcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVtYWlsX2Vycm9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcjphbnkpIHsgICAgICAgIFxyXG4gICAgICAgICAgY29uc3QgZm9ybV9lcnJvciA9IEpTT04uc3RyaW5naWZ5KCB7XCJmb3JtX2Vycm9yXCI6IFtcIkFuIGVycm9yIG9jY3VycmVkIGR1cmluZyBsb2dpbi4gVHJ5IGFnYWluIVwiXX0pXHJcbiAgICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9ycykgfHwgZm9ybV9lcnJvcik7IFxyXG4gICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gZXJyb3IucmVzcG9uc2U/LmRhdGE7XHJcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBlcnJvckRhdGE/LmVycm9ycztcclxuICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yRGF0YT8uZXJyb3I/Lm1lc3NhZ2U7XHJcbiAgICAgICAgICBjb25zdCBlcnJvclRvVGhyb3cgPSBlcnJvcnMgPyBKU09OLnN0cmluZ2lmeShlcnJvcnMpIDogKGVycm9yTWVzc2FnZSA/IEpTT04uc3RyaW5naWZ5KHtcInBhc3N3b3JkXCI6IFtlcnJvck1lc3NhZ2VdfSkgOiBmb3JtX2Vycm9yKTtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvclRvVGhyb3cpOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogJ2p3dCcsXHJcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXHJcbiAgfSxcclxuICBjYWxsYmFja3M6IHtcclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgLy8gSWYgdGhlIHVzZXIgb2JqZWN0IGV4aXN0cywgdXBkYXRlIHRoZSB0b2tlbiB3aXRoIHVzZXIgaW5mb1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLnVzZXIgPSB1c2VyO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKCdKV1QgQ2FsbGJhY2sgLSBUb2tlbjonLCB0b2tlbik7XHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfTphbnkpIHtcclxuICAgICAgLy8gRW5zdXJlIHRoZSBzZXNzaW9uIG9iamVjdCBpcyB1cGRhdGVkIHdpdGggdGhlIHRva2VuIGluZm9ybWF0aW9uXHJcbiAgICAgIGlmICh0b2tlbj8udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24gPSB0b2tlbjtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZygnU2Vzc2lvbiBDYWxsYmFjayAtIFNlc3Npb246Jyk7XHJcbiAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogJy9sb2dpbicsXHJcbiAgICBzaWduT3V0OiAnL2xvZ2luJyAvLyBBZGQgdGhpcyBsaW5lIHRvIHNwZWNpZnkgdGhlIGN1c3RvbSBzaWduLW91dCBwYWdlXHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImF4aW9zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwidXNlcl9lbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiYXBpVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJlbWFpbF9lcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJFcnJvciIsInJlcyIsInBvc3QiLCJ1c2VyIiwiZGF0YSIsInN0YXR1cyIsInRva2VuIiwiYWNjZXNzX3Rva2VuIiwiZW1haWwiLCJsb2dpbl91c2VyX2RhdGEiLCJlcnJvciIsImZvcm1fZXJyb3IiLCJlcnJvckRhdGEiLCJyZXNwb25zZSIsImVycm9ycyIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJlcnJvclRvVGhyb3ciLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJjYWxsYmFja3MiLCJqd3QiLCJjb25zb2xlIiwibG9nIiwicGFnZXMiLCJzaWduSW4iLCJzaWduT3V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fauth%2F%5B...nextauth%5D&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Cauth%5C%5B...nextauth%5D.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();