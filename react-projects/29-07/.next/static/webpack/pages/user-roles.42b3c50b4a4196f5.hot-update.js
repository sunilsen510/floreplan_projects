"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/user-roles",{

/***/ "./src/components/MultiSelectComponent.tsx":
/*!*************************************************!*\
  !*** ./src/components/MultiSelectComponent.tsx ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ \"./node_modules/react-select/dist/react-select.esm.js\");\n// import Select, { components } from 'react-select';\n// const CustomOption = (props:any) => {\n//   return (\n//     <components.Option {...props}>\n//       <input\n//         type=\"checkbox\"\n//         name=\"select\"\n//         checked={props.isSelected}\n//         onChange={() => null}\n//       />{' '}\n//       <label>{props.label}</label>\n//     </components.Option>\n//   );\n// };\n//  const MultiSelectCheckbox = ({ options }:any) => {\n//     const customStyles = {\n//       control: (base:any) => ({\n//         ...base,\n//         borderColor: '#ced4da',\n//         '&:hover': {\n//           borderColor: '#a6a6a6',\n//         },\n//       }),\n//     };\n//     return (\n//       <Select\n//         options={options}\n//         components={{ Option: CustomOption }}\n//         isMulti\n//         closeMenuOnSelect={false}\n//         hideSelectedOptions={false}\n//         styles={customStyles}\n//       />\n//     );\n//   };\n//   export default MultiSelectCheckbox\n\n\n\nconst CustomOption = (props)=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_select__WEBPACK_IMPORTED_MODULE_2__.components.Option, {\n        ...props,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"checkbox\",\n                name: \"select\",\n                checked: props.isSelected,\n                onChange: ()=>null\n            }, void 0, false, {\n                fileName: \"D:\\\\Ravi-data\\\\Floor-Plan\\\\frontend-new\\\\src\\\\components\\\\MultiSelectComponent.tsx\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, undefined),\n            \" \",\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: props.label\n            }, void 0, false, {\n                fileName: \"D:\\\\Ravi-data\\\\Floor-Plan\\\\frontend-new\\\\src\\\\components\\\\MultiSelectComponent.tsx\",\n                lineNumber: 66,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Ravi-data\\\\Floor-Plan\\\\frontend-new\\\\src\\\\components\\\\MultiSelectComponent.tsx\",\n        lineNumber: 59,\n        columnNumber: 5\n    }, undefined);\n};\n_c = CustomOption;\nconst MultiSelectCheckbox = (param)=>{\n    let { options, onChangeFn, selectedValue, isDisabledSelect, isSelectMultiselect = false } = param;\n    const customStyles = {\n        control: (base)=>({\n                ...base,\n                borderColor: \"#ced4da\",\n                \"&:hover\": {\n                    borderColor: \"#a6a6a6\"\n                }\n            })\n    };\n    if (isSelectMultiselect) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_select__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            options: options,\n            components: {\n                Option: CustomOption\n            },\n            isMulti: true,\n            closeMenuOnSelect: false,\n            hideSelectedOptions: false,\n            styles: customStyles,\n            onChange: onChangeFn,\n            value: selectedValue,\n            isDisabled: isDisabledSelect\n        }, void 0, false, {\n            fileName: \"D:\\\\Ravi-data\\\\Floor-Plan\\\\frontend-new\\\\src\\\\components\\\\MultiSelectComponent.tsx\",\n            lineNumber: 92,\n            columnNumber: 7\n        }, undefined);\n    } else {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_select__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            options: options,\n            closeMenuOnSelect: true,\n            hideSelectedOptions: false,\n            styles: customStyles,\n            onChange: onChangeFn,\n            value: selectedValue,\n            isDisabled: isDisabledSelect\n        }, void 0, false, {\n            fileName: \"D:\\\\Ravi-data\\\\Floor-Plan\\\\frontend-new\\\\src\\\\components\\\\MultiSelectComponent.tsx\",\n            lineNumber: 106,\n            columnNumber: 7\n        }, undefined);\n    }\n};\n_c1 = MultiSelectCheckbox;\n/* harmony default export */ __webpack_exports__[\"default\"] = (MultiSelectCheckbox);\nvar _c, _c1;\n$RefreshReg$(_c, \"CustomOption\");\n$RefreshReg$(_c1, \"MultiSelectCheckbox\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9NdWx0aVNlbGVjdENvbXBvbmVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EscURBQXFEO0FBQ3JELHdDQUF3QztBQUN4QyxhQUFhO0FBQ2IscUNBQXFDO0FBQ3JDLGVBQWU7QUFDZiwwQkFBMEI7QUFDMUIsd0JBQXdCO0FBQ3hCLHFDQUFxQztBQUNyQyxnQ0FBZ0M7QUFDaEMsZ0JBQWdCO0FBQ2hCLHFDQUFxQztBQUNyQywyQkFBMkI7QUFDM0IsT0FBTztBQUNQLEtBQUs7QUFJTCxzREFBc0Q7QUFDdEQsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyxtQkFBbUI7QUFDbkIsa0NBQWtDO0FBQ2xDLHVCQUF1QjtBQUN2QixvQ0FBb0M7QUFDcEMsYUFBYTtBQUNiLFlBQVk7QUFDWixTQUFTO0FBRVQsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQiw0QkFBNEI7QUFDNUIsZ0RBQWdEO0FBQ2hELGtCQUFrQjtBQUNsQixvQ0FBb0M7QUFDcEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFHUCx1Q0FBdUM7O0FBV2I7QUFDd0I7QUFFbEQsTUFBTUcsZUFBZSxDQUFDQztJQUNwQixxQkFDRSw4REFBQ0Ysb0RBQVVBLENBQUNHLE1BQU07UUFBRSxHQUFHRCxLQUFLOzswQkFDMUIsOERBQUNFO2dCQUNDQyxNQUFLO2dCQUNMQyxNQUFLO2dCQUNMQyxTQUFTTCxNQUFNTSxVQUFVO2dCQUN6QkMsVUFBVSxJQUFNOzs7Ozs7WUFDZjswQkFDSCw4REFBQ0M7MEJBQU9SLE1BQU1RLEtBQUs7Ozs7Ozs7Ozs7OztBQUd6QjtLQVpNVDtBQXNCTixNQUFNVSxzQkFBMEQ7UUFBQyxFQUFFQyxPQUFPLEVBQUVDLFVBQVUsRUFBRUMsYUFBYSxFQUFDQyxnQkFBZ0IsRUFBRUMsc0JBQXNCLEtBQUssRUFBRztJQUNwSixNQUFNQyxlQUFlO1FBQ25CQyxTQUFTLENBQUNDLE9BQWU7Z0JBQ3ZCLEdBQUdBLElBQUk7Z0JBQ1BDLGFBQWE7Z0JBQ2IsV0FBVztvQkFDVEEsYUFBYTtnQkFDZjtZQUNGO0lBQ0Y7SUFFQSxJQUFHSixxQkFBb0I7UUFDckIscUJBQ0UsOERBQUNqQixvREFBTUE7WUFDTGEsU0FBU0E7WUFDVFosWUFBWTtnQkFBRUcsUUFBUUY7WUFBYTtZQUNuQ29CLE9BQU87WUFDUEMsbUJBQW1CO1lBQ25CQyxxQkFBcUI7WUFDckJDLFFBQVFQO1lBQ1JSLFVBQVVJO1lBQ1ZZLE9BQU9YO1lBQ1BZLFlBQVlYOzs7Ozs7SUFHbEIsT0FBSztRQUNILHFCQUNFLDhEQUFDaEIsb0RBQU1BO1lBQ0xhLFNBQVNBO1lBQ1RVLG1CQUFtQjtZQUNuQkMscUJBQXFCO1lBQ3JCQyxRQUFRUDtZQUNSUixVQUFVSTtZQUNWWSxPQUFPWDtZQUNQWSxZQUFZWDs7Ozs7O0lBR2xCO0FBRUY7TUF2Q01KO0FBeUNOLCtEQUFlQSxtQkFBbUJBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvTXVsdGlTZWxlY3RDb21wb25lbnQudHN4P2ZiYjYiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIGltcG9ydCBTZWxlY3QsIHsgY29tcG9uZW50cyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcbi8vIGNvbnN0IEN1c3RvbU9wdGlvbiA9IChwcm9wczphbnkpID0+IHtcclxuLy8gICByZXR1cm4gKFxyXG4vLyAgICAgPGNvbXBvbmVudHMuT3B0aW9uIHsuLi5wcm9wc30+XHJcbi8vICAgICAgIDxpbnB1dFxyXG4vLyAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbi8vICAgICAgICAgbmFtZT1cInNlbGVjdFwiXHJcbi8vICAgICAgICAgY2hlY2tlZD17cHJvcHMuaXNTZWxlY3RlZH1cclxuLy8gICAgICAgICBvbkNoYW5nZT17KCkgPT4gbnVsbH1cclxuLy8gICAgICAgLz57JyAnfVxyXG4vLyAgICAgICA8bGFiZWw+e3Byb3BzLmxhYmVsfTwvbGFiZWw+XHJcbi8vICAgICA8L2NvbXBvbmVudHMuT3B0aW9uPlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG5cclxuXHJcbi8vICBjb25zdCBNdWx0aVNlbGVjdENoZWNrYm94ID0gKHsgb3B0aW9ucyB9OmFueSkgPT4ge1xyXG4vLyAgICAgY29uc3QgY3VzdG9tU3R5bGVzID0ge1xyXG4vLyAgICAgICBjb250cm9sOiAoYmFzZTphbnkpID0+ICh7XHJcbi8vICAgICAgICAgLi4uYmFzZSxcclxuLy8gICAgICAgICBib3JkZXJDb2xvcjogJyNjZWQ0ZGEnLFxyXG4vLyAgICAgICAgICcmOmhvdmVyJzoge1xyXG4vLyAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjYTZhNmE2JyxcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICB9KSxcclxuLy8gICAgIH07XHJcbiAgXHJcbi8vICAgICByZXR1cm4gKFxyXG4vLyAgICAgICA8U2VsZWN0XHJcbi8vICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuLy8gICAgICAgICBjb21wb25lbnRzPXt7IE9wdGlvbjogQ3VzdG9tT3B0aW9uIH19XHJcbi8vICAgICAgICAgaXNNdWx0aVxyXG4vLyAgICAgICAgIGNsb3NlTWVudU9uU2VsZWN0PXtmYWxzZX1cclxuLy8gICAgICAgICBoaWRlU2VsZWN0ZWRPcHRpb25zPXtmYWxzZX1cclxuLy8gICAgICAgICBzdHlsZXM9e2N1c3RvbVN0eWxlc31cclxuLy8gICAgICAgLz5cclxuLy8gICAgICk7XHJcbi8vICAgfTtcclxuXHJcblxyXG4vLyAgIGV4cG9ydCBkZWZhdWx0IE11bHRpU2VsZWN0Q2hlY2tib3hcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QsIHsgY29tcG9uZW50cyB9IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcblxyXG5jb25zdCBDdXN0b21PcHRpb24gPSAocHJvcHM6IGFueSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8Y29tcG9uZW50cy5PcHRpb24gey4uLnByb3BzfT5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICBuYW1lPVwic2VsZWN0XCJcclxuICAgICAgICBjaGVja2VkPXtwcm9wcy5pc1NlbGVjdGVkfVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBudWxsfVxyXG4gICAgICAvPnsnICd9XHJcbiAgICAgIDxsYWJlbD57cHJvcHMubGFiZWx9PC9sYWJlbD5cclxuICAgIDwvY29tcG9uZW50cy5PcHRpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmludGVyZmFjZSBNdWx0aVNlbGVjdENoZWNrYm94UHJvcHMge1xyXG4gIG9wdGlvbnM6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZyB9W107XHJcbiAgc2VsZWN0ZWRWYWx1ZT86IHsgdmFsdWU6IGFueTsgbGFiZWw6IHN0cmluZyB9W107XHJcbiAgb25DaGFuZ2VGbjogKHNlbGVjdGVkT3B0aW9uczogYW55KSA9PiB2b2lkO1xyXG4gIGlzRGlzYWJsZWRTZWxlY3Q/OiBib29sZWFuO1xyXG4gIGlzU2VsZWN0TXVsdGlzZWxlY3Q/OiBib29sZWFuO1xyXG59XHJcblxyXG5jb25zdCBNdWx0aVNlbGVjdENoZWNrYm94OiBSZWFjdC5GQzxNdWx0aVNlbGVjdENoZWNrYm94UHJvcHM+ID0gKHsgb3B0aW9ucywgb25DaGFuZ2VGbiwgc2VsZWN0ZWRWYWx1ZSxpc0Rpc2FibGVkU2VsZWN0LCBpc1NlbGVjdE11bHRpc2VsZWN0ID0gZmFsc2UgIH0pID0+IHtcclxuICBjb25zdCBjdXN0b21TdHlsZXMgPSB7XHJcbiAgICBjb250cm9sOiAoYmFzZTogYW55KSA9PiAoe1xyXG4gICAgICAuLi5iYXNlLFxyXG4gICAgICBib3JkZXJDb2xvcjogJyNjZWQ0ZGEnLFxyXG4gICAgICAnJjpob3Zlcic6IHtcclxuICAgICAgICBib3JkZXJDb2xvcjogJyNhNmE2YTYnLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgfTtcclxuXHJcbiAgaWYoaXNTZWxlY3RNdWx0aXNlbGVjdCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8U2VsZWN0IFxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgY29tcG9uZW50cz17eyBPcHRpb246IEN1c3RvbU9wdGlvbiB9fVxyXG4gICAgICAgIGlzTXVsdGlcclxuICAgICAgICBjbG9zZU1lbnVPblNlbGVjdD17ZmFsc2V9XHJcbiAgICAgICAgaGlkZVNlbGVjdGVkT3B0aW9ucz17ZmFsc2V9XHJcbiAgICAgICAgc3R5bGVzPXtjdXN0b21TdHlsZXN9XHJcbiAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlRm59XHJcbiAgICAgICAgdmFsdWU9e3NlbGVjdGVkVmFsdWV9XHJcbiAgICAgICAgaXNEaXNhYmxlZD17aXNEaXNhYmxlZFNlbGVjdH0gXHJcbiAgICAgIC8+XHJcbiAgICApO1xyXG4gIH1lbHNle1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFNlbGVjdCBcclxuICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxyXG4gICAgICAgIGNsb3NlTWVudU9uU2VsZWN0PXt0cnVlfVxyXG4gICAgICAgIGhpZGVTZWxlY3RlZE9wdGlvbnM9e2ZhbHNlfVxyXG4gICAgICAgIHN0eWxlcz17Y3VzdG9tU3R5bGVzfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUZufVxyXG4gICAgICAgIHZhbHVlPXtzZWxlY3RlZFZhbHVlfVxyXG4gICAgICAgIGlzRGlzYWJsZWQ9e2lzRGlzYWJsZWRTZWxlY3R9IFxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcbiAgXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNdWx0aVNlbGVjdENoZWNrYm94O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJTZWxlY3QiLCJjb21wb25lbnRzIiwiQ3VzdG9tT3B0aW9uIiwicHJvcHMiLCJPcHRpb24iLCJpbnB1dCIsInR5cGUiLCJuYW1lIiwiY2hlY2tlZCIsImlzU2VsZWN0ZWQiLCJvbkNoYW5nZSIsImxhYmVsIiwiTXVsdGlTZWxlY3RDaGVja2JveCIsIm9wdGlvbnMiLCJvbkNoYW5nZUZuIiwic2VsZWN0ZWRWYWx1ZSIsImlzRGlzYWJsZWRTZWxlY3QiLCJpc1NlbGVjdE11bHRpc2VsZWN0IiwiY3VzdG9tU3R5bGVzIiwiY29udHJvbCIsImJhc2UiLCJib3JkZXJDb2xvciIsImlzTXVsdGkiLCJjbG9zZU1lbnVPblNlbGVjdCIsImhpZGVTZWxlY3RlZE9wdGlvbnMiLCJzdHlsZXMiLCJ2YWx1ZSIsImlzRGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/MultiSelectComponent.tsx\n"));

/***/ })

});