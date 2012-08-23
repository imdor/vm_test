var PostVM = function(){
	AbstractVM.call(this);
	var my = this;
	var node = null;
	
	my.render = function(){
		node = {};
		node['root'] = cm.Node('fieldset',
			node['title'] = cm.Node('legend'),
			node['content'] = cm.Node('p')
		);
		return my;
	};
	
	my.set.title = function(txt){
		my.getNode('title').innerHTML = txt;
	};
	my.set.content = function(txt){
		my.getNode('content').innerHTML = txt;
	};
	
	my.getNode = function(nodeName){
		if(node === null)
			my.render();
		nodeName = nodeName||'root';
		return node[nodeName];
	};
};