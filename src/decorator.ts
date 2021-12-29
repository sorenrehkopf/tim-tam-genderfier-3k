import labelOps from './label-ops';

const randomIndex:number = Math.round(Math.random() * labelOps.length -1);

export const decorate = (target: HTMLElement) => {
	const labelTexts:string[] = labelOps[randomIndex];
	const labels:NodeListOf<HTMLElement> = target.querySelectorAll('.chart-pie-info>.item>:last-child');
	console.log('the labels!!',target.childNodes);
	labels.forEach((label: HTMLElement , i: number) => {
		label.innerText = labelTexts[i];
	});
};
