var AbstractModel = function(){
	var my = this,
        observation = true,
		updatedProperties = [],
		eventManager = null,
		domainObject = null;
    my.state = {};

	my.init = function(){
		return my;
	};

	my.set = function(property, value){
		var domain = my.getDomainObject();
		if(!('object' == typeof(domain))) throw 'Invalid domain type';
		domain[property] = value;
		updatedProperties.push(property);
		if(my.isObservable())
			my.getEventManager().triggerEvent('model.set', updatedProperties.splice(0, updatedProperties.length));
		return my;
	};

	my.get = function(property){
		var domain = my.getDomainObject();
		if(!('object' == typeof(domain))) throw 'Invalid domain type';
		return domain[property] || null;
	};

    my.addSubscriber = function(obj){
        my.getEventManager().addListener('model.set', obj);
        return my;
    };

    my.stopObservation = function(){
        observation = false;
        return my;
    };

    my.startObservation = function(){
        observation = true;
        return my;
    };

    my.triggerObserver = function(){
        my.getEventManager().triggerEvent('model.set');
        my.startObservation();
        return my;
    };
	
    my.isObservable = function(){
        return observation;
    };
	
	my.setDomainObject = function(o){
		domainObject = o;
		return my;
	};
	my.getDomainObject = function(){
		return domainObject;
	};
	
	my.setEventManager = function(o){
		eventManager = o;
		eventManager.registerEvent('model.set');
		eventManager.setContext(my);
		return my;
	};
	
	my.getEventManager = function(){
		return eventManager;
	};
};