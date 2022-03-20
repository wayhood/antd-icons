import * as components from '../node_modules/@ant-design/icons-vue';
import AIcon from '../node_modules/@ant-design/icons-vue/es/components/Icon';

export const install = function (app) {
	// console.log(AIcon);
	// AIcon.name = "AIcon";
	//console.log(AIcon.name);
	AIcon.install = function(app) {
		app.component('AIcon', AIcon);
	}
	app.use(AIcon);

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