/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */


;
(function($, window, document, undefined) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g. 
    // $.widget( "namespace.widgetname", (optional) - an 
    // existing widget prototype to inherit from, an object 
    // literal to become the widget's prototype ); 

    $.widget("mgm.orderTable", {
        //Options to be used as defaults
        options: {
            headers: [],
            lineas: [],
            totales: {}
        },
        lineas: [],
        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function() {
            // _create will automatically run the first time 
            // this widget is called. Put the initial widget 
            // setup code here, then you can access the element 
            // on which the widget was called via this.element. 
            // The options defined above can be accessed 
            // via this.options this.element.addStuff();
            var self = this;
            var el = self.element;
            this._on(el, {
                "dblclick tbody tr": function(event) {
                    var linea = ["A0001", "La descripcion", 5, 13.4];
                    this.addLinea(linea);
                },
                "change input.cell-unidades": this.editLinea,
                "click .borrar": function(event) {
                    var target = event.currentTarget;
                    var value = $(target).val();
                    var rowId = $(target).closest('tr').attr('id');
                    console.log(rowId);
                    this.removeLinea(rowId);
                }
            });
            this._render(el);
        },
        dobleClick: function(data, event) {
            event.preventDefault();
            console.log(event);
            alert("click");
        },
        _createHeader: function() {
            var th = "";
            var id = 0;
            //Crear la linea de id
            th += "<th>id</th>";
            $(this.options.headers).each(function(i, item) {
                th += "<th>" + item + "</th>";
            });
            this.header = "<thead><tr>" + th + "</tr></thead>";
        },
        _createBody: function() {
            var row = "";
            $(this.lineas).each(function(i, item) {
                var tds = "<td>" + i + "</td>";
                for (var j = 0; j < item.length; j++) {
                    //Celdas con input
                    if (j === 2) {
                        tds += "<td><input type='text' class ='cell-unidades' value=" + item[j] + " /></td>";
                    }
                    else {
                        tds += "<td>" + item[j] + "</td>";
                    }
                }
                //Calcular subtotal
                tds += "<td>" + item[2] * item[3] + "</td>";
                //Generar boton de borrar
                tds += "<td><button class='borrar'>x</button></td>";
                row += "<tr id=" + i + ">" + tds + "</td></tr>";
            });
            this.body += row;
        },
        _createFooter: function() {
            var unidades = 0;
            var total = 0;
            var row = "";
            var tds = "";
            $(this.lineas).each(function(i, item) {
                unidades += item[2];
                total += item[2] * item[3];
            });
            tds += "<td></td><td></td><td></td><td>" + unidades + "</td><td></td><td>" + total + "</td>";
            row += "<tfooter><tr>" + tds + "</tr></tfooter>";
            this.footer = row;
        },
        _render: function(el) {
            this.header = "";
            this.body = "";
            this.footer = "";
            this._createHeader();
            this._createBody();
            this._createFooter();
            el.html(this.header + this.body + this.footer);
        },
        addLinea: function(linea) {
            this.lineas.push(linea);
            this._render(this.element);
        },
        removeLinea: function(id) {
            this.lineas.splice(id, 1);
            this._render(this.element);
        },
        editLinea: function(event) {
            var target = event.currentTarget;
            var value = $(target).val();
            var rowId = $(target).closest('tr').attr('id');
            //La cantidad es la posicion 2 del array
            this.lineas[rowId][2] = parseInt(value);
            this._render(this.element);
        },
        getLinea: function(id) {
            var linea = {};
            linea.codigo = this.lineas[id][0];
            linea.nombre = this.lineas[id][1];
            linea.cantidad = this.lineas[id][2];
            linea.precio = this.lineas[id][3];
            linea.subtotal = linea.cantidad * linea.precio;
            return linea;
        },
        getLineas: function() {
            var lineas = [];
            for (var i = 0; i < this.lineas.length; i++) {
                lineas.push(this.getLinea(i));
            }
            return lineas;

        },
        // Destroy an instantiated plugin and clean up 
        // modifications the widget has made to the DOM
        destroy: function() {
            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the 
            // base widget
            $.Widget.prototype.destroy.call(this);
            // For UI 1.9, define _destroy instead and don't 
            // worry about 
            // calling the base widget
        },
        methodB: function(event) {
            //_trigger dispatches callbacks the plugin user 
            // can subscribe to
            // signature: _trigger( "callbackName" , [eventObject], 
            // [uiObject] )
            // eg. this._trigger( "hover", e /*where e.type == 
            // "mouseenter"*/, { hovered: $(e.target)});
            this._trigger('methodA', event, {
                key: value
            });
        },
        methodA: function(event) {
            this._trigger('dataChanged', event, {
                key: value
            });
        },
        // Respond to any changes the user makes to the 
        // option method
        _setOption: function(key, value) {
            switch (key) {
                case "someValue":
                    //this.options.someValue = doSomethingWith( value );
                    break;
                default:
                    this.options[ key ] = value;
                    break;
            }

            // For UI 1.8, _setOption must be manually invoked 
            // from the base widget
            $.Widget.prototype._setOption.apply(this, arguments);
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        },
        _pintaHeader: function() {
            var myHtml = "";
            $(this.options.headers).each(function(i, item) {
                myHtml += "<th>" + item + "</th>";
            });

            return myHtml;
        }
    });

})(jQuery, window, document);


