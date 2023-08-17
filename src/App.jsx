import { useState } from "react"

function App() {
	const [step, setStep] = useState(1)
	const [projectInfo, setProjectInfo] = useState({
		projectName: "",
		projectDescription: "",
		client: "",
		contractor: "",
	})
	const [csvFile, setCsvFile] = useState(null)
	const [minMaxValues, setMinMaxValues] = useState({
		max_X: 0,
		min_X: 0,
		max_Y: 0,
		min_Y: 0,
		max_Z: 0,
		min_Z: 0,
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setProjectInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
	}

	const handleFileUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			// Implement CSV file parsing here
			// Update minMaxValues based on parsed data
			setCsvFile(file)
		}
	}

	const handleNextStep = () => {
		// Move to next step
		setStep(step + 1)
	}

	return (
		<div>
			{step === 1 && (
				<form className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-gray-800 shadow-md">
					<h1 className="text-2xl font-semibold mb-4">
						Step 1: Project Information
					</h1>

					{/* NAME */}
					<input
						className="input"
						type="text"
						name="projectName"
						value={projectInfo.projectName}
						onChange={handleInputChange}
						placeholder="Project Name"
					/>

					{/* DESCRIPTION */}
					<input
						className="input"
						type="text"
						name="projectDescription"
						value={projectInfo.projectDescription}
						onChange={handleInputChange}
						placeholder="Description"
					/>

					{/* CLIENT */}
					<input
						className="input"
						type="text"
						name="client"
						value={projectInfo.client}
						onChange={handleInputChange}
						placeholder="Client"
					/>

					{/* CONTRACTOR */}
					<input
						className="input"
						type="text"
						name="constructor"
						value={projectInfo.constructor}
						onChange={handleInputChange}
						placeholder="Constructor"
					/>

					<button
						type="submit"
						className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring"
						onClick={handleNextStep}
					>
						Next
					</button>
				</form>
			)}
			{step === 2 && (
				<div className="flex flex-col align-center justify-center">
					<h2>Step 2: Additional Information</h2>
					{/* Display projectInfo values from step 1 */}
					<p>Project Name: {projectInfo.projectName}</p>
					{/* Add other input fields for project description, client, and contractor */}
					<input type="file" onChange={handleFileUpload} />
					{/* Display minMaxValues values */}
					<p>Max X: {minMaxValues.max_X}</p>
					{/* Add other minMaxValues fields */}
				</div>
			)}
		</div>
	)
}

export default App
