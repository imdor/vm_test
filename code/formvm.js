var FormVM = function(){
	AbstractVM.call(this);
	var my = this;
	var node = null;
	
	my.render = function(){
		node = {};
		node['root'] = cm.Node('div',
			node['title'] = cm.Node('input', {'type' : 'text'}),
			node['content'] = cm.Node('textarea')
		);
		attachEvents();
		return my;
	};
	
	var attachEvents = function(){
		my.getNode('title').addEventListener('input', function(e){
			my.setProperty('title', e.target.value);
		});
		my.getNode('content').addEventListener('input', function(e){
			my.setProperty('content', e.target.value);
		});
	};
	
	my.set.title = function(txt){
		my.getNode('title').value = txt;
	};
	my.set.content = function(txt){
		my.getNode('content').value = txt;
	};
	
	my.getNode = function(nodeName){
		if(node === null)
			my.render();
		nodeName = nodeName||'root';
		return node[nodeName];
	};
};
