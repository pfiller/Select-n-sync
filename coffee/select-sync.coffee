$ = jQuery

class SelectSync
  
  constructor: (populated, @fields...) ->
    @selected = []
    option_html = populated.html()

    @fields.unshift(populated)
    
    this.set_up_field field, i, option_html for field, i in @fields

  set_up_field: (field, i, option_html) ->
    field.html(option_html)
    field[0].new_index = i
    field.change (evt) => this.field_change(evt)
  
  field_change: (evt) ->
    new_index = evt.target.new_index
    val = $(evt.target).val()
    
    if(@selected[new_index]!=val)
      @selected[new_index] = val
      this.rebuild_field_values(field) for field in @fields
  
  rebuild_field_values: (field) ->
    index = field[0].new_index
    
    for option in $(field).find("option")
      val = option.value
      option.disabled = $.inArray(val, @selected) >= 0 and val isnt @selected[index] if val
    
    $(field).trigger("liszt:updated")

$ ->
  new SelectSync($("#beatle1"),$("#beatle2"),$("#beatle3"),$("#beatle4"))
  $(".chosen").chosen({allow_single_deselect:true})