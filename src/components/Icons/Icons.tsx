import type { FC, SVGProps } from 'react'
import type { IconProps } from '@components/Icons/interface'
import GraphSVG from './icons/graph.svg?component'

const Icon = (SvgComponent: FC<SVGProps<SVGSVGElement>>): React.FC<IconProps> =>
	function ({
		height = '20',
		width = '20',
		className = '',
		onClick
	}: IconProps) {
		const svgProps = {
			height,
			width,
			className,
			onClick
		}
		return <SvgComponent {...svgProps} />
	}

export const GraphIcon = Icon(GraphSVG)
