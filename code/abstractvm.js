var AbstractVM = function(){
	var my = this;
	var model = null;
	var properties = {};
	my.set = {};
	my.bind = function(modelToBind){
		my.setModel(modelToBind);
		my.checkProperties(my.set);
		modelToBind.addSubscriber(function(e){my.checkProperties(e.params)});
		return my;
	};
	my.checkProperties = function(list){
		var propertiesToUpdate = [];
		if(!(list instanceof Array))
			list = cm.keys(list);
		list.forEach(function(property){
			var value = my.getModel().get(property);
			if(properties[property] == value)
				return; //no changes
			properties[property] = value;
			propertiesToUpdate.push(property);
		});
		my.update(propertiesToUpdate);
		return my;
	};
	my.setProperty = function(property, value){
		my.getModel().set(property, properties[property] = value);
		return my;
	};
	my.setProperties = function(o){
		properties = o;
		return my;
	};
	my.getProperty = function(property){
		return properties[property];
	};
	my.update = function(list){
		if(typeof(list) == 'undefined')
			list = cm.keys(properties);
		if(!(list instanceof Array))
			list = cm.keys(list);
		list.forEach(function(property){
			if(typeof(my.set[property]) != 'undefined') 
				my.set[property](properties[property]);
		});
		return my;
	};
	my.getModel = function(){
		return model;
	};
	my.setModel = function(o){
		model = o;
		return my;
	};
};