import { fade, fly, scale, slide, blur } from 'svelte/transition';
import type {
	FadeParams,
	BlurParams,
	FlyParams,
	SlideParams,
	ScaleParams
} from 'svelte/transition';

export declare type BuiltInTransition = 'fade' | 'blur' | 'fly' | 'slide' | 'scale';
export declare type BuiltInTransitionConfig =
	| FadeParams
	| BlurParams
	| FlyParams
	| SlideParams
	| ScaleParams;

export const variableTransition = (
	node: Element | (SVGElement & { getTotalLength(): number }),
	args: {
		useTransition: boolean;
		transitionType: BuiltInTransition;
		transitionConfig: BuiltInTransitionConfig;
	}
) => {
	if (args.useTransition) {
		switch (args.transitionType) {
			case 'fade':
				return fade(node, args.transitionConfig);
			case 'blur':
				return blur(node, args.transitionConfig);
			case 'fly':
				return fly(node, args.transitionConfig);
			case 'slide':
				return slide(node, args.transitionConfig);
			case 'scale':
				return scale(node, args.transitionConfig);
		}
	}
};
