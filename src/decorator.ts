import labelOps from './label-ops';

const randomIndex:number = Math.round(Math.random() * labelOps.length -1);
const labelTexts:string[] = labelOps[randomIndex];

export const decorate = (target: HTMLElement) => {
	const labels:NodeListOf<HTMLElement> = target.querySelectorAll('.chart-pie-info>.item>:last-child')

	labels.forEach((label: HTMLElement , i: number) => {
		label.innerText = labelTexts[i];
	});
};
