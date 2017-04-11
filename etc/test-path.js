// used for auto adding log-path.
(function() {
	var level = 4;
	var fp = __filename.split('/').slice(level).join('::').replace(/\.js$/, '::');
    //var fp = require('path').resolve(__dirname).substr(1).replace(/\//g, '::');

    function ClassFunc(age, name) {
        this.logPath = fp + this.constructor.name + '::';
		this.age = age;
		this.name = name;
        this.getName = function() {
			var fname = arguments[arguments.length-1] || 'N/A';
            console.log(this.logPath + fname + '-> ' + this.name);
        },
        this.getAge = function() {
			var fname = arguments[arguments.length-1] || 'N/A';
            console.log(this.logPath + fname + '-> ' + this.age);
        }
    }

    function func() {
        var logPath = fp + arguments.callee.name;
		console.log(logPath, '- logs...'); 
    }

    var instance = new ClassFunc(18, 'Golden Age');
    instance.getName('getName');
    instance.getAge('getAge');

    func();
}());
