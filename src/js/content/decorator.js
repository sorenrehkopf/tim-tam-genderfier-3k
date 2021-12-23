import random from 'lodash/random';

const labelOps = [
	['Gender is a construct', 'Hail Satan'],
	['Be gay', 'Do Crimes'],
	['Not a phase', 'MOM'],
	['Humans', 'Other humans'],
	['Panic', 'Disco'],
	['Chemical', 'Romance'],
	['Danny Devito', 'Ian McKellen'],
];

const randomIndex = random(0, labelOps.length -1);
const labelTexts = labelOps[randomIndex];

export const decorate = target => {
	const labels = target.querySelectorAll('.chart-pie-info>.item>:last-child')

	labels.forEach((label, i) => {
		label.innerText = labelTexts[i];
	});
};
