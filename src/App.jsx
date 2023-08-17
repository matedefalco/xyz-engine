import { useState } from "react"

function App() {
	const [step, setStep] = useState(1)
	const [projectInfo, setProjectInfo] = useState({
		projectName: "",
		projectDescription: "",
		client: "",
		constructor: "",
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
			
			setCsvFile(file)
		}
	}

	const handleNextStep = () => {
		// Move to next step
		setStep(step + 1)
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-6">
			{step === 1 && (
				<form className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-gray-800 shadow-md">
					<h1 className="text-white text-2xl font-semibold">XYZ ENGINE</h1>
					{/* NAME */}
					<input
						className="bg-gray-700 text-white rounded-md p-2"
						type="text"
						name="projectName"
						value={projectInfo.projectName}
						onChange={handleInputChange}
						placeholder="Project Name"
					/>
					{/* DESCRIPTION */}
					<input
						className="bg-gray-700 text-white rounded-md p-2"
						type="text"
						name="projectDescription"
						value={projectInfo.projectDescription}
						onChange={handleInputChange}
						placeholder="Description"
					/>
					{/* CLIENT */}
					<input
						className="bg-gray-700 text-white rounded-md p-2"
						type="text"
						name="client"
						value={projectInfo.client}
						onChange={handleInputChange}
						placeholder="Client"
					/>
					{/* CONTRACTOR */}
					<input
						className="bg-gray-700 text-white rounded-md p-2"
						type="text"
						name="constructor"
						value={projectInfo.constructor}
						onChange={handleInputChange}
						placeholder="Constructor"
					/>
					<button
						type="button"
						className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring"
						onClick={handleNextStep}
					>
						Next
					</button>
				</form>
			)}
			{step === 2 && (
				<div className="flex flex-col items-center justify-center gap-4">
					<h2 className="text-xl font-semibold">
						Step 2: Additional Information
					</h2>
					{/* Display projectInfo values from step 1 */}
					<div className="p-4 bg-gray-800 rounded-lg shadow-md">
						<div className="flex gap-1">
							<p className="text-white">Project Name:</p>
							<p className="text-white font-bold">{projectInfo.projectName}</p>
						</div>
						<div className="flex gap-1">
							<p className="text-white">Description:</p>
							<p className="text-white font-bold">
								{projectInfo.projectDescription}
							</p>
						</div>
						<div className="flex gap-1">
							<p className="text-white">Client:</p>
							<p className="text-white font-bold">{projectInfo.client}</p>
						</div>
						<div className="flex gap-1">
							<p className="text-white">Constructor:</p>
							<p className="text-white font-bold">{projectInfo.constructor}</p>
						</div>
					</div>
					<form className="flex flex-col items-center gap-4 p-4 rounded-xl border border-2 border-gray-800 border-solid">
						<p className="text-white bg-gray-700 p-2 ">
							💡 Upload the file, or type them manually
						</p>
						<input
							type="file"
							className="flex justify-center"
							onChange={handleFileUpload}
							accept=".csv"
						/>
						{/* Display minMaxValues values */}
						<div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg shadow-md">
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Min X:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="minX"
									value={minMaxValues.min_X}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Max X:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="maxX"
									value={minMaxValues.max_X}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Min Y:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="minY"
									value={minMaxValues.min_Y}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Max Y:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="maxY"
									value={minMaxValues.max_Y}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Min Z:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="minZ"
									value={minMaxValues.min_Z}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex justify-center items-center gap-1">
								<label className="text-white min-w-50">Max Z:</label>
								<input
									className="bg-gray-700 text-white rounded-md p-2"
									type="text"
									name="maxZ"
									value={minMaxValues.min_Z}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring"
						>
							Show Results
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default App
