import axios from 'axios'
import { useState } from 'react'
import { baseURL } from '../App'
import './Footer.scss'
import facebookIcon from '../assets/facebook.svg'
import githubIcon from "../assets/github2.svg"
import instagramIcon from '../assets/instagram.svg'
import linkedinIcon from '../assets/linkedin.svg'
import twitterIcon from '../assets/twitter.svg'
import sentIcon from '../assets/send.svg'

const contactIcons = [
	{
		name: "GitHub",
		icon: githubIcon,
		url: "https://github.com/MeghanBomberger"
	},
	{
		name: "LinkedIn",
		icon: linkedinIcon,
		url: "https://www.linkedin.com/in/meghanbomberger/"
	},
	{
		name: "Instagram",
		icon: instagramIcon,
		url: "https://www.instagram.com/geekerybathe/"
	},
	{
		name: "Facebook",
		icon: facebookIcon,
		url: "https://www.facebook.com/barbedlotus"
	},
	{
		name: "Twitter",
		icon: twitterIcon,
		url: "https://twitter.com/MeghanBomberger"
	}
]

export default function Footer () {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [message, setMessage] = useState("")
	const [confirmation, setConfirmation] = useState(false)
	const [fade, setFade] = useState(0)
	const [error, setError] = useState("")

  console.error("ERROR MESSAGE: ", error) // TODO: temporary console log to suppress unused variable warning for error state. Will be used in future update to display error message to user if message fails to send.

	const handleSubmit = (e) => {
		e.preventDefault()

		axios.post(`${baseURL}/messages`, {
			name,
			email,
			phone,
			message
		})
			.then(() => {
				setConfirmation(true)
				setFade(100)
				setName("")
				setEmail("")
				setPhone("")
				setMessage("")
				setTimeout(() => {
					setFade(75)
					setTimeout(() => {
						setFade(50)
						setTimeout(() => {
							setFade(25)
							setTimeout(() => {
								setFade(0)
								setConfirmation(false)
							}, 500)
						}, 500)
					}, 500)
				}, 4000)
			})
			.catch(err => {
				console.error(err)
				setError("Ut oh! An error has occured...")
				setConfirmation(false)
			})
	}

	const fadeOut = {
		filter: `opacity(${confirmation ? 50 : 100}%)`
	}

	return (
		<footer>
			<h2>Let's Make Some Things</h2>
			<div className="contact-info">
				<h3>get in touch</h3>
				<a
					className="phone"
					href="tel:1-801-494-9418"
				>
					801-494-9418
				</a>
				<a
					className="email"
					href="mailto:meghanbomberger@gmail.com"
				>
					meghanbomberger@gmail.com
				</a>
				<div className="social-media-container">
					{contactIcons.map(icon => (
						<a
							key={icon.name}
							className="contact-icon"
							href={icon.url}
						>
							<img
								alt={icon.name}
								title={icon.name}
								src={icon.icon}
							/>
						</a>
					))}
				</div>
			</div>
			<form className="contact-form" onSubmit={e => handleSubmit(e)}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={e => setName(e.target.value)}
					required
					style={fadeOut}
				/>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					style={fadeOut}
				/>
				<input
					type="tel"
					placeholder="phone"
					value={phone}
					onChange={e => setPhone(e.target.value)}
					style={fadeOut}
				/>
				<textarea
					placeholder="Message"
					value={message}
					onChange={e => setMessage(e.target.value)}
					required
					style={fadeOut}
				/>
				<input
					type="submit"
					value="Send Message"
					disabled={confirmation}
					className="submit"
					style={fadeOut}
				/>
				<div
					className="confirmation"
					style={{
						visibility: confirmation ? "visible" : "hidden",
						filter: `opacity(${fade}%)`
					}}
				>
					<img
						alt="message sent"
						title="message sent"
						src={sentIcon}
					/>
					<p>Message sent</p>
				</div>
			</form>
		</footer>
	)
}
