import React, { createRef } from 'react';
import './app.scss';

export default class App extends React.Component {
	canvasRef = createRef()
	canvasRenderInterval = -1

	componentDidMount() {
		const canvas = this.canvasRef.current

		const width = canvas.width
		const height = canvas.height

		const ctx = canvas.getContext("2d")

		this.canvasRenderInterval = setInterval(() => {
			ctx.fillStyle = "white"
			ctx.fillRect(0, 0, width, height)

			ctx.fillStyle = "black"
			ctx.beginPath()
			ctx.moveTo(0, 0)
			ctx.lineTo(100, 50)
			ctx.lineTo(100, 25)
			ctx.closePath()
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1;
			ctx.stroke()
		}, 50)
	}

	componentWillUnmount() {
		clearInterval(this.canvasRenderInterval)
	}

	render() {
		return (
			<div className="main-page">
				<canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} />
			</div>
		)
	}
}
