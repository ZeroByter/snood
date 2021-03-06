import React, { createRef } from 'react';
import { defaultMap, snoodSize } from '../../shared/constants';
import './app.scss';

export default class App extends React.Component {
	snoods = []
	snoodsMap = {}
	viewOffset = {
		x: 0,
		y: 0
	}

	canvasRef = createRef()
	canvasRenderInterval = -1

	componentDidMount() {
		this.props.socket.on("newEntity", data => {
			if (data.type === "snood") {
				this.snoodsMap[data.id] = this.snoods.length
				this.snoods.push(data.location)
			}
		})
		this.props.socket.on("allEntities", data => {
			Object.entries(data.snoods).forEach(entry => {
				const id = entry[0]
				const snood = entry[1]

				this.snoodsMap[id] = this.snoods.length
				this.snoods.push(snood)
			})
		})

		const canvas = this.canvasRef.current

		const width = canvas.width
		const height = canvas.height

		const ctx = canvas.getContext("2d")

		const scale = 12

		this.canvasRenderInterval = setInterval(() => {
			ctx.fillStyle = "white"
			ctx.fillRect(0, 0, width, height)

			ctx.strokeStyle = "black";
			ctx.lineWidth = 1
			defaultMap.borders.forEach(border => {
				ctx.beginPath()
				border.forEach(point => {
					ctx.lineTo(point[0] * scale + this.viewOffset.x, point[1] * scale + this.viewOffset.y)
				})
				ctx.closePath()
				ctx.stroke()
			})

			ctx.lineWidth = snoodSize * scale * 0.3;
			ctx.fillStyle = "green"
			ctx.strokeStyle = '#003300';
			this.snoods.forEach(snood => {
				ctx.beginPath();
				ctx.arc(snood.x * scale + this.viewOffset.x, snood.y * scale + this.viewOffset.y, snoodSize * scale, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.stroke();
			})
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
