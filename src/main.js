import * as components from '../node_modules/@ant-design/icons-vue';


export const install = function (app) {
	Object.keys(components).forEach(key => {
	    const component = components[key];

	    if (component.install) {
	    	app.use(component);
	    } else {
		    component.install = function(app) {
		    	app.component(key, component)
		    }
		    app.use(component);
	    }
  	});
};

export default {
 	version: 2.0,
 	install,
}