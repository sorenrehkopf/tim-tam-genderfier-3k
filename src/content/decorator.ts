import { getLabelOps } from '../utils/local-storage-getters';


export const decorate = async (target: HTMLElement): Promise<void> => {
	const labelOps: string[][] = await getLabelOps();
	const randomIndex: number = Math.round(Math.random() * (labelOps.length -1));
	const labelTexts: string[] = labelOps[randomIndex];
	const labels: NodeListOf<HTMLElement> = target.querySelectorAll('.chart-pie-info>.item>:last-child')
	const undecorated: boolean = Array.from(labels).map((el: HTMLElement) => el.innerText).join(',') === 'Male,Female';

	if (undecorated) {
		labels.forEach((label: HTMLElement , i: number) => {
			label.innerText = labelTexts[i];
		});
	}
};
