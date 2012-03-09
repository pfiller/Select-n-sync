(function() {
  var $, SelectSync;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  SelectSync = (function() {
    function SelectSync() {
      var field, fields, i, option_html, populated, _len, _ref;
      populated = arguments[0], fields = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.fields = fields;
      this.selected = [];
      option_html = populated.html();
      this.fields.unshift(populated);
      _ref = this.fields;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        field = _ref[i];
        this.set_up_field(field, i, option_html);
      }
    }
    SelectSync.prototype.set_up_field = function(field, i, option_html) {
      field.html(option_html);
      field[0].new_index = i;
      return field.change(__bind(function(evt) {
        return this.field_change(evt);
      }, this));
    };
    SelectSync.prototype.field_change = function(evt) {
      var field, new_index, val, _i, _len, _ref, _results;
      new_index = evt.target.new_index;
      val = $(evt.target).val();
      if (this.selected[new_index] !== val) {
        this.selected[new_index] = val;
        _ref = this.fields;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          _results.push(this.rebuild_field_values(field));
        }
        return _results;
      }
    };
    SelectSync.prototype.rebuild_field_values = function(field) {
      var index, option, val, _i, _len, _ref;
      index = field[0].new_index;
      _ref = $(field).find("option");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        val = option.value;
        if (val) {
          option.disabled = $.inArray(val, this.selected) >= 0 && val !== this.selected[index];
        }
      }
      return $(field).trigger("liszt:updated");
    };
    return SelectSync;
  })();
  $(function() {
    new SelectSync($("#beatle1"), $("#beatle2"), $("#beatle3"), $("#beatle4"));
    return $(".chosen").chosen({
      allow_single_deselect: true
    });
  });
}).call(this);
