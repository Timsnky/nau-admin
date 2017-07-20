webpackJsonp([2],{

/***/ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Pagination = __webpack_require__("./resources/assets/js/dashboard/views/Images/views/List/components/Pagination/index.vue");

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            images: [],
            isLoaded: false,
            currentPage: 1,
            pagesCount: 1,
            itemsPerPage: 15,
            searchTerm: '',
            userId: 0,
            myUserId: 0
        };
    },
    mounted: function mounted() {
        var _this = this;

        this.getPaginatedData(this.currentPage).then(function (response) {
            var _response$data = response.data,
                data = _response$data.data,
                current_page = _response$data.current_page,
                per_page = _response$data.per_page,
                last_page = _response$data.last_page;


            _this.images = data;
            _this.currentPage = current_page;
            _this.itemsPerPage = per_page;
            _this.pagesCount = last_page;
            _this.isLoaded = true;
            _this.myUserId = Api.user().id;
            _this.userId = _this.myUserId;
        }).catch(function (err) {
            Vue.toast('Error in loading the Images. Please refresh the page', {
                className: ['nau_toast', 'nau_warning']
            });
            _this.isLoaded = true;
        });
    },


    components: {
        Pagination: _Pagination2.default
    },

    watch: {
        searchTerm: function searchTerm() {
            this.navigate(1);
        },
        userId: function userId() {
            this.navigate(1);
        }
    },

    methods: {
        deleteImage: function deleteImage(image) {
            var _this2 = this;

            Api.http.delete('/images/' + image.id).then(function (response) {
                return _this2.images = _this2.images.filter(function (item) {
                    return item.id !== image.id;
                });
            }).catch(function (err) {
                return Vue.toast('Error in deleting the Image. Please retry again', {
                    className: ['nau_toast', 'nau_warning']
                });
            });
        },
        navigate: function navigate(page) {
            var _this3 = this;

            this.getPaginatedData(page).then(function (response) {
                var _response$data2 = response.data,
                    data = _response$data2.data,
                    current_page = _response$data2.current_page,
                    last_page = _response$data2.last_page,
                    from = _response$data2.from;


                _this3.images = data;
                _this3.currentPage = current_page;
                _this3.pagesCount = last_page;
            }).catch(function (err) {
                return Vue.toast('Error in retreiving the Images. Please retry again', {
                    className: ['nau_toast', 'nau_warning']
                });
            });
        },
        getPaginatedData: function getPaginatedData(page) {
            var searchString = '';
            var userString = '';

            if (this.searchTerm !== '') {
                searchString += 'search=' + this.searchTerm + '&';
            }

            if (this.userId != 0) {
                userString += 'user_id=' + this.userId + '&';
            }

            return Api.http.get('/images?' + searchString + userString + ('page=' + page));
        },
        dispatchImageSelected: function dispatchImageSelected(id) {
            this.$emit('imageSelected', id);
            this.reset();
            $('#imageSelectionModal').modal('hide');
        },
        reset: function reset() {
            this.searchTerm = "";
            this.myUserId = Api.user().id;
            this.userId = this.myUserId;
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
exports.push([module.i, "\n.image_selection_filters {\n    padding-top: 10px;\n    padding-bottom: 10px;\n}\n.image_selection_rows {\n    padding-top: 20px;\n    padding-bottom: 20px;\n}\n.image_selection_section_image {\n    margin-right: 10px;\n    margin-top: auto;\n    margin-bottom: auto;\n    width: 240px;\n}\n.image_selection_section_image img, .image_selection_section_image video {\n    max-height: 180px;\n    width: auto;\n    max-width: 240px;\n    height: auto;\n}\n.close {\n    text-indent: initial;\n}\n.image_choice {\n    cursor: pointer;\n}\n.image_chooser_section {\n    padding-top: 10px;\n    padding-bottom: 10px;\n    height: 120px;\n}\n", ""]);

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d887aef2\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row image_selection_filters"
  }, [_c('div', {
    staticClass: "col-md-6"
  }, [(_vm.images.length > 0 || _vm.searchTerm !== '') ? _c('div', {
    staticClass: "input-icon"
  }, [_c('i', {
    staticClass: "fa fa-search"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.searchTerm),
      expression: "searchTerm",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "form-control",
    attrs: {
      "type": "search",
      "placeholder": "Search",
      "name": "searchTerm"
    },
    domProps: {
      "value": (_vm.searchTerm)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchTerm = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 text-right"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.userId),
      expression: "userId"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "user_id",
      "id": "user_id"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.userId = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    domProps: {
      "value": _vm.myUserId
    }
  }, [_vm._v("My Images")]), _vm._v(" "), _c('option', {
    domProps: {
      "value": 0
    }
  }, [_vm._v("All Images")])])])]), _vm._v(" "), (!_vm.isLoaded) ? _c('h2', {
    staticClass: "text-center"
  }, [_vm._v("Loading...")]) : (_vm.images.length > 0) ? _c('div', [_c('div', {
    staticClass: "row image_selection_rows"
  }, _vm._l((_vm.images), function(image) {
    return _c('div', {
      staticClass: "col-md-6 col-lg-6 col-sm-6"
    }, [_c('div', {
      staticClass: "image_section_left image_chooser_section"
    }, [_c('div', {
      staticClass: "image_selection_section_image"
    }, [_c('img', {
      staticClass: "media-object image_choice",
      attrs: {
        "height": "100px",
        "width": "150px",
        "src": image.url,
        "alt": "..."
      },
      on: {
        "click": function($event) {
          _vm.dispatchImageSelected(image.id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "image_section_details"
    }, [_c('p', [_c('strong', [_vm._v(_vm._s(image.name))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(image.lead))])])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }, [_c('pagination', {
    staticClass: "pull-right",
    attrs: {
      "items": _vm.images,
      "currentPage": _vm.currentPage,
      "pagesCount": _vm.pagesCount,
      "itemsPerPage": _vm.itemsPerPage
    },
    on: {
      "navigate": _vm.navigate
    }
  })], 1)]) : _c('h2', {
    staticClass: "text-center"
  }, [_vm._v("No images uploaded")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d887aef2", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("1a0ddacc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageSelectModal.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageSelectModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/js/dashboard/components/ImageSelectModal.vue":
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d887aef2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue")

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?cacheDirectory!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d887aef2\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/dashboard/components/ImageSelectModal.vue"),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/michele/Code/nau-admin/resources/assets/js/dashboard/components/ImageSelectModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ImageSelectModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d887aef2", Component.options)
  } else {
    hotAPI.reload("data-v-d887aef2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});