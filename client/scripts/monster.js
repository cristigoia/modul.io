/*!
  * Cookie Monster - A javascript cookie library 
  * v0.0.2
  * https://github.com/jgallen23/cookie-monster
  * copyright JGA 2011
  * MIT License
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('monster', function() {

var monster = function() {
  return {
    set: function(name, value, days, path) {
      var date = new Date(),
          expires = '',
          type = typeof(value),
          valueToUse = '';
      path = path || "/";
      if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      if(type !== "string"  && type !== "undefined"){
          if(!("JSON" in window)) throw "Bummer, your browser doesn't support JSON parsing.";
          valueToUse = JSON.stringify({v:value});
      }
      else
        valueToUse = escape(value);
      
      document.cookie = name + "=" + valueToUse + expires + "; path=" + path;
    },
    get: function(name) {
      var nameEQ = name + "=",
          ca = document.cookie.split(';'),
          value = '',
          firstChar = '',
          parsed={};
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          value = c.substring(nameEQ.length, c.length);
          firstChar = value.substring(0, 1);
          if(firstChar=="{"){
            parsed = JSON.parse(value);
            if("v" in parsed) return parsed.v;
          }
          if(value=="undefined") return undefined;
          return unescape(value);
        }
      }
      return null;
    },
    remove: function(name) {
      this.set(name, "", -1);
    }
  };
}();

  return monster;
});
