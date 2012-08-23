var PostModel = function(){
	AbstractModel.call(this);
	var my = this;
	var domainObject = null;
	var eventManager = null;
};
var PostVM = function(){
	AbstractVM.call(this);
	var my = this;
	var node = null;
	
	my.render = function(){
		node = {};
		node['root'] = cm.Node('fieldset',
			node['title'] = cm.Node('legend'),
			node['content'] = cm.Node('p', {'style' : 'white-space:pre;'})
		);
		return my;
	};
	my.set.title = function(txt){my.getNode('title').innerHTML = txt;};
	my.set.content = function(txt){my.getNode('content').innerHTML = txt;};
	my.getNode = function(nodeName){
		if(node === null) my.render();
		return node[nodeName||'root'];
	};
};

var FormVM = function(){
	AbstractVM.call(this);
	var my = this;
	var node = null;
	
	my.render = function(){
		node = {};
		node['root'] = cm.Node('div',
			cm.Node('label', 'Your title:'),
			cm.Node('div', node['title'] = cm.Node('input', {'type' : 'text'})),
			cm.Node('label', 'Your content:'),
			cm.Node('div', node['content'] = cm.Node('textarea', {'style' : 'width:400px;height:100px;'}))
		);
		attachEvents();
		return my;
	};
	var attachEvents = function(){
		my.getNode('title').addEventListener('input', function(e){my.setProperty('title', e.target.value);});
		my.getNode('content').addEventListener('input', function(e){my.setProperty('content', e.target.value);});
	};
	my.set.title = function(txt){
		my.getNode('title').value = txt;
	};
	my.set.content = function(txt){
		my.getNode('content').value = txt;
	};
	my.getNode = function(nodeName){
		if(node === null) my.render();
		return node[nodeName||'root'];
	};
};

var HashVM = function(){
	AbstractVM.call(this);
	var my = this;
	var node = null;
	my.render = function(){
		node = {};
		node['root'] = window.location;
		attachEvents();
		return my;
	};
	var attachEvents = function(){
		window.addEventListener('hashchange', function(e){
			my.setProperty('title', my.getNode('root').hash.replace(/^#/, ''));
		});
	};
	my.set.title = function(txt){my.getNode('root').hash = txt||'#';};
	my.getNode = function(nodeName){
		if(node === null) my.render();
		return node[nodeName||'root'];
	};
};

var postModel1 = new PostModel()
				.setEventManager(new EventManager())
				.setDomainObject({'title' : 'Title', 'content' : 'lorem ipsum'});
				
var postVM1 = new PostVM().bind(postModel1);
var postVM2 = new PostVM().bind(postModel1);
var formVM1 = new FormVM().bind(postModel1);
var formVM2 = new FormVM().bind(postModel1);
new HashVM().bind(postModel1);
window.addEventListener('load', function(){
	document.body.appendChild(postVM1.getNode());
	document.body.appendChild(formVM1.getNode());
	document.body.appendChild(postVM2.getNode());
	document.body.appendChild(formVM2.getNode());
});