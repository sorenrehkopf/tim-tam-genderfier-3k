const child = document.createElement('div');
child.style.position = 'fixed';
child.style.backgroundColor = 'green';
child.style.height = '300px';
child.style.width = '300px';
child.style.top = '20px';
child.style.left = '20px';

export const decorate = target => {
	console.log('decorating target!', target);
	target.appendChild(child);
};
